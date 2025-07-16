-- Insert service categories
INSERT INTO service_categories (name, description, icon, color, emoji, sort_order) VALUES
('Limpeza', 'Serviços de limpeza residencial e comercial', 'fas fa-broom', 'text-blue-500', '🧹', 1),
('Reparos', 'Reparos gerais e manutenção', 'fas fa-wrench', 'text-green-500', '🔧', 2),
('Pintura', 'Pintura residencial e comercial', 'fas fa-paint-roller', 'text-yellow-500', '🎨', 3),
('Técnico', 'Serviços técnicos especializados', 'fas fa-laptop', 'text-purple-500', '💻', 4),
('Beleza', 'Serviços de beleza e estética', 'fas fa-cut', 'text-pink-500', '✂️', 5),
('Educação', 'Aulas particulares e educação', 'fas fa-graduation-cap', 'text-blue-600', '🎓', 6),
('Jardinagem', 'Paisagismo e manutenção de jardins', 'fas fa-leaf', 'text-green-600', '🌱', 7),
('Transporte', 'Serviços de transporte e mudanças', 'fas fa-truck', 'text-orange-500', '🚚', 8),
('Culinária', 'Serviços de culinária e gastronomia', 'fas fa-utensils', 'text-red-500', '👨‍🍳', 9),
('Pet Care', 'Cuidados com animais de estimação', 'fas fa-paw', 'text-brown-500', '🐕', 10);

-- Insert Brazilian states and major cities
INSERT INTO brazilian_locations (state, state_code, city, latitude, longitude, is_capital, population) VALUES
('São Paulo', 'SP', 'São Paulo', -23.5505, -46.6333, true, 12300000),
('São Paulo', 'SP', 'Campinas', -22.9056, -47.0608, false, 1200000),
('São Paulo', 'SP', 'Santos', -23.9618, -46.3322, false, 433000),
('Rio de Janeiro', 'RJ', 'Rio de Janeiro', -22.9068, -43.1729, true, 6700000),
('Rio de Janeiro', 'RJ', 'Niterói', -22.8833, -43.1036, false, 515000),
('Minas Gerais', 'MG', 'Belo Horizonte', -19.9167, -43.9345, true, 2500000),
('Minas Gerais', 'MG', 'Uberlândia', -18.9113, -48.2622, false, 700000),
('Bahia', 'BA', 'Salvador', -12.9714, -38.5014, true, 2900000),
('Bahia', 'BA', 'Feira de Santana', -12.2664, -38.9663, false, 620000),
('Paraná', 'PR', 'Curitiba', -25.4284, -49.2733, true, 1900000),
('Paraná', 'PR', 'Londrina', -23.3045, -51.1696, false, 580000),
('Rio Grande do Sul', 'RS', 'Porto Alegre', -30.0346, -51.2177, true, 1480000),
('Rio Grande do Sul', 'RS', 'Caxias do Sul', -29.1678, -51.1794, false, 520000),
('Santa Catarina', 'SC', 'Florianópolis', -27.5954, -48.5480, true, 500000),
('Santa Catarina', 'SC', 'Joinville', -26.3044, -48.8487, false, 590000),
('Goiás', 'GO', 'Goiânia', -16.6869, -49.2648, true, 1500000),
('Distrito Federal', 'DF', 'Brasília', -15.8267, -47.9218, true, 3000000),
('Pernambuco', 'PE', 'Recife', -8.0476, -34.8770, true, 1650000),
('Ceará', 'CE', 'Fortaleza', -3.7319, -38.5267, true, 2700000),
('Pará', 'PA', 'Belém', -1.4558, -48.5044, true, 1500000);

-- Insert system statistics
INSERT INTO system_stats (stat_key, stat_value, description) VALUES
('active_users', 0, 'Total active users'),
('active_providers', 0, 'Total active providers'),
('completed_services', 0, 'Total completed services'),
('average_rating', 4.9, 'Platform average rating'),
('total_revenue', 0, 'Total platform revenue'),
('services_this_month', 0, 'Services created this month');

-- Sample users (providers)
INSERT INTO users (
    id, email, name, phone, user_type, location, profession, 
    experience, hourly_rate, average_rating, total_reviews, 
    is_verified, specialties
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'maria.silva@email.com',
    'Maria Silva',
    '(11) 99999-1234',
    'prestador',
    'São Paulo, SP',
    'Diarista',
    'Mais de 5 anos de experiência em limpeza residencial',
    80.00,
    4.9,
    127,
    true,
    ARRAY['Limpeza residencial', 'Limpeza pós-obra', 'Organização']
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'carlos.mendes@email.com',
    'Carlos Mendes',
    '(11) 99999-5678',
    'prestador',
    'São Paulo, SP',
    'Pintor',
    'Pintor profissional com trabalhos em residências e comércios',
    95.00,
    5.0,
    203,
    true,
    ARRAY['Pintura residencial', 'Pintura comercial', 'Textura']
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    'joao.santos@email.com',
    'João Santos',
    '(21) 99999-9012',
    'prestador',
    'Rio de Janeiro, RJ',
    'Técnico em Reparos',
    'Especialista em reparos elétricos, hidráulicos e marcenaria',
    120.00,
    4.7,
    89,
    true,
    ARRAY['Elétrica', 'Hidráulica', 'Marcenaria']
),
(
    '550e8400-e29b-41d4-a716-446655440004',
    'ana.costa@email.com',
    'Ana Costa',
    '(31) 99999-3456',
    'prestador',
    'Belo Horizonte, MG',
    'Manicure',
    'Profissional de beleza com atendimento domiciliar',
    60.00,
    4.8,
    156,
    true,
    ARRAY['Manicure', 'Pedicure', 'Esmaltação em gel']
),
(
    '550e8400-e29b-41d4-a716-446655440005',
    'pedro.oliveira@email.com',
    'Pedro Oliveira',
    '(71) 99999-7890',
    'prestador',
    'Salvador, BA',
    'Professor',
    'Professor de matemática e física para ensino médio',
    50.00,
    4.9,
    78,
    false,
    ARRAY['Matemática', 'Física', 'Reforço escolar']
),
(
    '550e8400-e29b-41d4-a716-446655440006',
    'lucia.fernandes@email.com',
    'Lucia Fernandes',
    '(41) 99999-2468',
    'prestador',
    'Curitiba, PR',
    'Jardineira',
    'Especialista em paisagismo e manutenção de jardins',
    70.00,
    4.6,
    92,
    true,
    ARRAY['Paisagismo', 'Poda', 'Manutenção de jardins']
);

-- Sample clients
INSERT INTO users (
    id, email, name, phone, user_type, location
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440007',
    'cliente1@email.com',
    'Roberto Silva',
    '(11) 98888-1111',
    'cliente',
    'São Paulo, SP'
),
(
    '550e8400-e29b-41d4-a716-446655440008',
    'cliente2@email.com',
    'Fernanda Santos',
    '(21) 98888-2222',
    'cliente',
    'Rio de Janeiro, RJ'
);

-- Update system stats with real data
SELECT update_system_stats();
