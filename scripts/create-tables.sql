-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('cliente', 'prestador')),
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  birth_date DATE,
  cpf TEXT,
  profession TEXT,
  experience TEXT,
  specialties TEXT[],
  work_radius TEXT,
  hourly_rate DECIMAL(10,2),
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  completed_services INTEGER DEFAULT 0,
  response_time TEXT,
  acceptance_rate INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  location TEXT NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('baixa', 'normal', 'alta', 'urgente')),
  status TEXT NOT NULL DEFAULT 'novo' CHECK (status IN ('novo', 'proposta_enviada', 'aceito', 'em_andamento', 'concluido', 'cancelado')),
  client_id UUID REFERENCES users(id) NOT NULL,
  provider_id UUID REFERENCES users(id),
  progress INTEGER DEFAULT 0,
  price DECIMAL(10,2),
  start_date DATE,
  estimated_end DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('service_request', 'message', 'payment', 'review', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  urgent BOOLEAN DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id) NOT NULL,
  provider_id UUID REFERENCES users(id) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  estimated_time TEXT,
  start_date DATE,
  materials TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id) NOT NULL,
  client_id UUID REFERENCES users(id) NOT NULL,
  provider_id UUID REFERENCES users(id) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id),
  sender_id UUID REFERENCES users(id) NOT NULL,
  receiver_id UUID REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view provider profiles" ON users
  FOR SELECT USING (user_type = 'prestador');

-- Create policies for services table
CREATE POLICY "Users can view services they're involved in" ON services
  FOR SELECT USING (
    auth.uid() = client_id OR 
    auth.uid() = provider_id OR
    status = 'novo'
  );

CREATE POLICY "Clients can create services" ON services
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update services they're involved in" ON services
  FOR UPDATE USING (
    auth.uid() = client_id OR 
    auth.uid() = provider_id
  );

-- Create policies for notifications table
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for proposals table
CREATE POLICY "Users can view proposals for their services" ON proposals
  FOR SELECT USING (
    auth.uid() = provider_id OR
    auth.uid() IN (SELECT client_id FROM services WHERE id = service_id)
  );

CREATE POLICY "Providers can create proposals" ON proposals
  FOR INSERT WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Users can update proposals they're involved in" ON proposals
  FOR UPDATE USING (
    auth.uid() = provider_id OR
    auth.uid() IN (SELECT client_id FROM services WHERE id = service_id)
  );

-- Create policies for reviews table
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Clients can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update their own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = client_id OR auth.uid() = provider_id);

-- Create policies for messages table
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Create functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON proposals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_services_client_id ON services(client_id);
CREATE INDEX idx_services_provider_id ON services(provider_id);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_proposals_service_id ON proposals(service_id);
CREATE INDEX idx_proposals_provider_id ON proposals(provider_id);
CREATE INDEX idx_reviews_provider_id ON reviews(provider_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
