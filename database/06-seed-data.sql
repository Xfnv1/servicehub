-- =============================================================================
-- ServiceHub Database - Seed Data
-- =============================================================================
-- This file inserts initial data for development and testing
-- Execute this AFTER all other database setup files

-- =============================================================================
-- SERVICE CATEGORIES
-- =============================================================================
INSERT INTO service_categories (id, name, slug, description, icon, color, emoji, sort_order, is_active) VALUES
('cat-11111111-1111-1111-1111-111111111111', 'Limpeza e Organização', 'limpeza-organizacao', 'Serviços de limpeza residencial, comercial e organização de ambientes', 'cleaning', '#4CAF50', '🧹', 1, true),
('cat-22222222-2222-2222-2222-222222222222', 'Elétrica e Eletrônica', 'eletrica-eletronica', 'Instalações elétricas, reparos e manutenção de equipamentos eletrônicos', 'zap', '#FF9800', 2, true),
('cat-33333333-3333-3333-3333-333333333333', 'Hidráulica e Encanamento', 'hidraulica-encanamento', 'Reparos hidráulicos, instalações e manutenção de sistemas de água', 'droplet', '#2196F3', 3, true),
('cat-44444444-4444-4444-4444-444444444444', 'Pintura e Decoração', 'pintura-decoracao', 'Pintura residencial, comercial e serviços de decoração', 'palette', '#9C27B0', 4, true),
('cat-55555555-5555-5555-5555-555555555555', 'Jardinagem e Paisagismo', 'jardinagem-paisagismo', 'Cuidados com jardins, plantas e projetos paisagísticos', 'leaf', '#4CAF50', 5, true),
('cat-66666666-6666-6666-6666-666666666666', 'Beleza e Estética', 'beleza-estetica', 'Serviços de beleza, estética e cuidados pessoais', 'sparkles', '#E91E63', 6, true),
('cat-77777777-7777-7777-7777-777777777777', 'Educação e Ensino', 'educacao-ensino', 'Aulas particulares, cursos e serviços educacionais', 'book', '#3F51B5', 7, true),
('cat-88888888-8888-8888-8888-888888888888', 'Tecnologia e TI', 'tecnologia-ti', 'Suporte técnico, desenvolvimento e serviços de tecnologia', 'laptop', '#607D8B', 8, true),
('cat-99999999-9999-9999-9999-999999999999', 'Transporte e Logística', 'transporte-logistica', 'Serviços de transporte, mudanças e logística', 'truck', '#795548', 9, true),
('cat-aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Alimentação e Gastronomia', 'alimentacao-gastronomia', 'Serviços de culinária, catering e gastronomia', 'chef-hat', '#FF5722', 10, true)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- BRAZILIAN LOCATIONS
-- =============================================================================
INSERT INTO brazilian_locations (state, state_code, city, latitude, longitude, is_capital, population) VALUES
-- São Paulo
('São Paulo', 'SP', 'São Paulo', -23.5505, -46.6333, true, 12300000),
('São Paulo', 'SP', 'Campinas', -22.9056, -47.0608, false, 1200000),
('São Paulo', 'SP', 'Santos', -23.9618, -46.3322, false, 433000),
('São Paulo', 'SP', 'Ribeirão Preto', -21.1775, -47.8103, false, 703000),
('São Paulo', 'SP', 'Sorocaba', -23.5015, -47.4526, false, 687000),

-- Rio de Janeiro
('Rio de Janeiro', 'RJ', 'Rio de Janeiro', -22.9068, -43.1729, true, 6700000),
('Rio de Janeiro', 'RJ', 'Niterói', -22.8833, -43.1036, false, 515000),
('Rio de Janeiro', 'RJ', 'Nova Iguaçu', -22.7592, -43.4511, false, 823000),
('Rio de Janeiro', 'RJ', 'Duque de Caxias', -22.7858, -43.3117, false, 924000),

-- Minas Gerais
('Minas Gerais', 'MG', 'Belo Horizonte', -19.9167, -43.9345, true, 2500000),
('Minas Gerais', 'MG', 'Uberlândia', -18.9113, -48.2622, false, 700000),
('Minas Gerais', 'MG', 'Contagem', -19.9317, -44.0536, false, 668000),
('Minas Gerais', 'MG', 'Juiz de Fora', -21.7642, -43.3503, false, 573000),

-- Bahia
('Bahia', 'BA', 'Salvador', -12.9714, -38.5014, true, 2900000),
('Bahia', 'BA', 'Feira de Santana', -12.2664, -38.9663, false, 620000),
('Bahia', 'BA', 'Vitória da Conquista', -14.8619, -40.8444, false, 350000),

-- Paraná
('Paraná', 'PR', 'Curitiba', -25.4284, -49.2733, true, 1900000),
('Paraná', 'PR', 'Londrina', -23.3045, -51.1696, false, 580000),
('Paraná', 'PR', 'Maringá', -23.4205, -51.9331, false, 430000),

-- Rio Grande do Sul
('Rio Grande do Sul', 'RS', 'Porto Alegre', -30.0346, -51.2177, true, 1480000),
('Rio Grande do Sul', 'RS', 'Caxias do Sul', -29.1678, -51.1794, false, 520000),
('Rio Grande do Sul', 'RS', 'Pelotas', -31.7654, -52.3376, false, 343000),

-- Santa Catarina
('Santa Catarina', 'SC', 'Florianópolis', -27.5954, -48.5480, true, 500000),
('Santa Catarina', 'SC', 'Joinville', -26.3044, -48.8487, false, 590000),
('Santa Catarina', 'SC', 'Blumenau', -26.9194, -49.0661, false, 362000),

-- Outros estados
('Goiás', 'GO', 'Goiânia', -16.6869, -49.2648, true, 1500000),
('Distrito Federal', 'DF', 'Brasília', -15.8267, -47.9218, true, 3000000),
('Pernambuco', 'PE', 'Recife', -8.0476, -34.8770, true, 1650000),
('Ceará', 'CE', 'Fortaleza', -3.7319, -38.5267, true, 2700000),
('Pará', 'PA', 'Belém', -1.4558, -48.5044, true, 1500000),
('Amazonas', 'AM', 'Manaus', -3.1190, -60.0217, true, 2200000),
('Espírito Santo', 'ES', 'Vitória', -20.3155, -40.3128, true, 365000),
('Maranhão', 'MA', 'São Luís', -2.5387, -44.2825, true, 1100000),
('Piauí', 'PI', 'Teresina', -5.0892, -42.8019, true, 870000),
('Alagoas', 'AL', 'Maceió', -9.6658, -35.7353, true, 1000000),
('Sergipe', 'SE', 'Aracaju', -10.9472, -37.0731, true, 660000),
('Paraíba', 'PB', 'João Pessoa', -7.1195, -34.8450, true, 820000),
('Rio Grande do Norte', 'RN', 'Natal', -5.7945, -35.2110, true, 890000),
('Mato Grosso', 'MT', 'Cuiabá', -15.6014, -56.0979, true, 650000),
('Mato Grosso do Sul', 'MS', 'Campo Grande', -20.4697, -54.6201, true, 900000),
('Rondônia', 'RO', 'Porto Velho', -8.7619, -63.9039, true, 540000),
('Acre', 'AC', 'Rio Branco', -9.9754, -67.8249, true, 410000),
('Roraima', 'RR', 'Boa Vista', 2.8235, -60.6758, true, 420000),
('Amapá', 'AP', 'Macapá', 0.0389, -51.0664, true, 500000),
('Tocantins', 'TO', 'Palmas', -10.1689, -48.3317, true, 310000)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- SYSTEM STATISTICS
-- =============================================================================
INSERT INTO system_stats (stat_key, stat_value, description) VALUES
('active_users', 15420, 'Total de usuários ativos na plataforma'),
('active_providers', 8750, 'Total de prestadores ativos'),
('completed_services', 45230, 'Total de serviços concluídos'),
('average_rating', 4.8, 'Avaliação média da plataforma'),
('total_revenue', 2850000.00, 'Receita total da plataforma em R$'),
('services_this_month', 1250, 'Serviços criados este mês'),
('response_time_avg', 35, 'Tempo médio de resposta em minutos'),
('satisfaction_rate', 96.5, 'Taxa de satisfação dos clientes'),
('provider_earnings_avg', 2850.00, 'Ganho médio mensal dos prestadores'),
('repeat_customers', 78.5, 'Porcentagem de clientes que retornam')
ON CONFLICT (stat_key) DO UPDATE SET 
    stat_value = EXCLUDED.stat_value,
    last_updated = NOW();

-- =============================================================================
-- SAMPLE USERS - CLIENTS
-- =============================================================================
INSERT INTO users (
    id, email, full_name, display_name, user_type, phone, bio, 
    address, city, state, postal_code, latitude, longitude,
    is_active, is_verified, created_at
) VALUES
('cli-11111111-1111-1111-1111-111111111111', 'ana.silva@email.com', 'Ana Silva Santos', 'Ana Silva', 'cliente', '(11) 99999-1001', 
'Empresária do setor de marketing digital. Valorizo profissionais pontuais e que executem serviços com qualidade.',
'Rua das Flores, 123, Apto 45', 'São Paulo', 'SP', '01234-567', -23.5505, -46.6333, true, true, NOW() - INTERVAL '45 days'),

('cli-22222222-2222-2222-2222-222222222222', 'carlos.santos@email.com', 'Carlos Roberto Santos', 'Carlos Santos', 'cliente', '(11) 99999-1002',
'Pai de família, engenheiro civil. Procuro sempre profissionais qualificados para manutenção da casa.',
'Av. Paulista, 456, Conjunto 78', 'São Paulo', 'SP', '01310-100', -23.5618, -46.6565, true, true, NOW() - INTERVAL '30 days'),

('cli-33333333-3333-3333-3333-333333333333', 'mariana.costa@email.com', 'Mariana Costa Lima', 'Mariana Costa', 'cliente', '(11) 99999-1003',
'Arquiteta e designer de interiores. Tenho olhar crítico para detalhes e acabamentos.',
'Rua Oscar Freire, 789, Casa', 'São Paulo', 'SP', '01426-001', -23.5677, -46.7019, true, true, NOW() - INTERVAL '25 days'),

('cli-44444444-4444-4444-4444-444444444444', 'roberto.lima@email.com', 'Roberto Lima Oliveira', 'Roberto Lima', 'cliente', '(11) 99999-1004',
'Executivo de vendas com agenda corrida. Preciso de serviços rápidos e eficientes.',
'Av. Faria Lima, 321, Torre A', 'São Paulo', 'SP', '04538-132', -23.5751, -46.6742, true, true, NOW() - INTERVAL '20 days'),

('cli-55555555-5555-5555-5555-555555555555', 'lucia.fernandes@email.com', 'Lúcia Fernandes Almeida', 'Lúcia Fernandes', 'cliente', '(11) 99999-1005',
'Aposentada, professora. Gosto de manter minha casa sempre organizada e bem cuidada.',
'Rua Augusta, 654, Apto 12', 'São Paulo', 'SP', '01305-000', -23.5613, -46.6563, true, true, NOW() - INTERVAL '15 days')
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- SAMPLE USERS - PROVIDERS
-- =============================================================================
INSERT INTO users (
    id, email, full_name, display_name, user_type, phone, bio, profession,
    specialties, hourly_rate, experience_years, work_radius_km,
    address, city, state, postal_code, latitude, longitude,
    average_rating, total_reviews, completed_services, response_time_minutes,
    acceptance_rate, completion_rate, is_active, is_verified, created_at
) VALUES
('pro-11111111-1111-1111-1111-111111111111', 'maria.limpeza@email.com', 'Maria Oliveira Santos', 'Maria Oliveira', 'prestador', '(11) 99999-2001',
'Profissional de limpeza com mais de 15 anos de experiência. Trabalho com produtos ecológicos.',
'Diarista e Organizadora', ARRAY['limpeza residencial', 'limpeza comercial', 'organização', 'limpeza pós-obra'], 85.00, 15, 25,
'Rua das Palmeiras, 456', 'São Paulo', 'SP', '02345-678', -23.5489, -46.6388,
4.9, 156, 189, 45, 95.50, 98.40, true, true, NOW() - INTERVAL '180 days'),

('pro-22222222-2222-2222-2222-222222222222', 'joao.eletricista@email.com', 'João Pereira Silva', 'João Pereira', 'prestador', '(11) 99999-2002',
'Eletricista certificado pelo CREA-SP com especialização em automação residencial.',
'Eletricista', ARRAY['instalações elétricas', 'automação residencial', 'sistemas de segurança'], 120.00, 12, 30,
'Av. São João, 789', 'São Paulo', 'SP', '01035-000', -23.5558, -46.6396,
4.8, 98, 112, 60, 88.75, 96.20, true, true, NOW() - INTERVAL '150 days'),

('pro-33333333-3333-3333-3333-333333333333', 'pedro.professor@email.com', 'Pedro Rodrigues Costa', 'Pedro Rodrigues', 'prestador', '(11) 99999-2003',
'Professor de matemática e física com mestrado pela USP. Especialista em preparação para vestibulares.',
'Professor Particular', ARRAY['matemática', 'física', 'química', 'preparação vestibular'], 75.00, 8, 20,
'Rua da Consolação, 234', 'São Paulo', 'SP', '01302-000', -23.5505, -46.6333,
4.95, 203, 267, 30, 92.30, 99.10, true, true, NOW() - INTERVAL '120 days'),

('pro-44444444-4444-4444-4444-444444444444', 'carlos.pintor@email.com', 'Carlos Mendes Alves', 'Carlos Mendes', 'prestador', '(11) 99999-2004',
'Pintor profissional com 20 anos de experiência. Especialista em texturas decorativas.',
'Pintor', ARRAY['pintura residencial', 'pintura comercial', 'texturas decorativas'], 95.00, 20, 35,
'Rua do Paraíso, 567', 'São Paulo', 'SP', '04103-000', -23.5729, -46.6431,
4.7, 134, 156, 90, 85.60, 94.80, true, true, NOW() - INTERVAL '200 days'),

('pro-55555555-5555-5555-5555-555555555555', 'ana.manicure@email.com', 'Ana Beatriz Costa', 'Ana Beatriz', 'prestador', '(11) 99999-2005',
'Manicure e pedicure profissional com curso de especialização em nail art.',
'Manicure e Pedicure', ARRAY['manicure', 'pedicure', 'esmaltação em gel', 'nail art'], 65.00, 6, 15,
'Rua Bela Vista, 890', 'São Paulo', 'SP', '01308-000', -23.5505, -46.6333,
4.85, 178, 234, 40, 90.25, 97.60, true, true, NOW() - INTERVAL '90 days'),

('pro-66666666-6666-6666-6666-666666666666', 'luis.jardineiro@email.com', 'Luís Silva Santos', 'Luís Silva', 'prestador', '(11) 99999-2006',
'Jardineiro paisagista com formação técnica em agricultura. Trabalho sustentável e ecológico.',
'Jardineiro Paisagista', ARRAY['paisagismo', 'poda de plantas', 'plantio', 'manutenção de jardins'], 70.00, 10, 20,
'Rua Verde, 123', 'São Paulo', 'SP', '04567-890', -23.5729, -46.6431,
4.6, 89, 103, 120, 82.40, 91.30, true, true, NOW() - INTERVAL '160 days'),

('pro-77777777-7777-7777-7777-777777777777', 'fernanda.cozinheira@email.com', 'Fernanda Alves Lima', 'Fernanda Alves', 'prestador', '(11) 99999-2007',
'Chef de cozinha especializada em eventos e aulas de culinária. Formada pelo Senac.',
'Chef de Cozinha', ARRAY['culinária brasileira', 'culinária internacional', 'eventos'], 150.00, 12, 40,
'Av. Rebouças, 345', 'São Paulo', 'SP', '05401-000', -23.5677, -46.7019,
4.9, 67, 78, 90, 94.20, 98.70, true, true, NOW() - INTERVAL '100 days'),

('pro-88888888-8888-8888-8888-888888888888', 'ricardo.tecnico@email.com', 'Ricardo Santos Oliveira', 'Ricardo Santos', 'prestador', '(11) 99999-2008',
'Técnico em informática com especialização em redes e segurança digital.',
'Técnico em TI', ARRAY['suporte técnico', 'instalação de redes', 'segurança digital'], 100.00, 9, 25,
'Rua da Tecnologia, 678', 'São Paulo', 'SP', '05678-901', -23.5558, -46.6396,
4.75, 112, 134, 50, 87.90, 95.50, true, true, NOW() - INTERVAL '110 days')
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- SAMPLE SERVICES
-- =============================================================================
INSERT INTO services (
    id, client_id, provider_id, category_id, title, description, requirements,
    budget_min, budget_max, address, city, state, postal_code, latitude, longitude,
    urgency, status, preferred_date, estimated_duration_hours, tags, created_at, published_at
) VALUES
-- Available services
('ser-11111111-1111-1111-1111-111111111111', 'cli-11111111-1111-1111-1111-111111111111', NULL, 'cat-11111111-1111-1111-1111-111111111111',
'Limpeza Completa Apartamento 3 Quartos', 
'Preciso de limpeza completa do meu apartamento de 3 quartos, 2 banheiros, sala, cozinha e área de serviço.',
ARRAY['produtos de limpeza ecológicos', 'equipamentos próprios', 'experiência com apartamentos'],
200.00, 350.00, 'Rua das Flores, 123, Apto 45', 'São Paulo', 'SP', '01234-567', -23.5505, -46.6333,
'normal', 'published', NOW() + INTERVAL '3 days', 5, 
ARRAY['limpeza', 'apartamento', '3 quartos'], NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours'),

('ser-22222222-2222-2222-2222-222222222222', 'cli-22222222-2222-2222-2222-222222222222', NULL, 'cat-22222222-2222-2222-2222-222222222222',
'Instalação de 4 Ventiladores de Teto',
'Preciso instalar 4 ventiladores de teto na casa. Já tenho os ventiladores, preciso apenas da instalação.',
ARRAY['experiência com instalações elétricas', 'ferramentas próprias', 'certificação CREA'],
300.00, 500.00, 'Av. Paulista, 456, Conjunto 78', 'São Paulo', 'SP', '01310-100', -23.5618, -46.6565,
'high', 'published', NOW() + INTERVAL '2 days', 4,
ARRAY['elétrica', 'instalação', 'ventiladores'], NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),

-- Services in progress
('ser-33333333-3333-3333-3333-333333333333', 'cli-44444444-4444-4444-4444-444444444444', 'pro-44444444-4444-4444-4444-444444444444', 'cat-44444444-4444-4444-4444-444444444444',
'Pintura Completa da Sala de Estar',
'Pintura completa da sala de estar (35m²). Parede já preparada, preciso apenas da aplicação da tinta.',
ARRAY['tinta de qualidade', 'acabamento perfeito', 'limpeza pós-serviço'],
800.00, 1200.00, 'Av. Faria Lima, 321, Torre A', 'São Paulo', 'SP', '04538-132', -23.5751, -46.6742,
'normal', 'in_progress', NOW() + INTERVAL '1 day', 16,
ARRAY['pintura', 'sala', 'residencial'], NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

-- Completed services
('ser-44444444-4444-4444-4444-444444444444', 'cli-55555555-5555-5555-5555-555555555555', 'pro-55555555-5555-5555-5555-555555555555', 'cat-66666666-6666-6666-6666-666666666666',
'Manicure e Pedicure Domiciliar',
'Serviço de manicure e pedicure em casa. Atendimento semanal, sempre às sextas-feiras.',
ARRAY['pontualidade', 'materiais esterilizados', 'atendimento domiciliar'],
80.00, 120.00, 'Rua Augusta, 654, Apto 12', 'São Paulo', 'SP', '01305-000', -23.5613, -46.6563,
'low', 'completed', NOW() - INTERVAL '2 days', 2,
ARRAY['beleza', 'manicure', 'domiciliar'], NOW() - INTERVAL '1 week', NOW() - INTERVAL '1 week')
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- SAMPLE NOTIFICATIONS
-- =============================================================================
INSERT INTO notifications (
    id, user_id, type, title, message, related_service_id, related_user_id,
    is_read, is_urgent, data, action_url, created_at
) VALUES
-- Client notifications
('not-11111111-1111-1111-1111-111111111111', 'cli-11111111-1111-1111-1111-111111111111', 'proposal_received',
'Nova Proposta Recebida', 'Maria Oliveira enviou uma proposta de R$ 280,00 para seu serviço de limpeza',
'ser-11111111-1111-1111-1111-111111111111', 'pro-11111111-1111-1111-1111-111111111111',
false, true, '{"price": 280.00, "provider_name": "Maria Oliveira"}', '/servicos/ser-11111111-1111-1111-1111-111111111111',
NOW() - INTERVAL '1 hour'),

('not-22222222-2222-2222-2222-222222222222', 'cli-22222222-2222-2222-2222-222222222222', 'proposal_received',
'Proposta para Instalação Elétrica', 'João Pereira enviou proposta para instalação dos ventiladores',
'ser-22222222-2222-2222-2222-222222222222', 'pro-22222222-2222-2222-2222-222222222222',
false, true, '{"price": 420.00, "provider_name": "João Pereira"}', '/servicos/ser-22222222-2222-2222-2222-222222222222',
NOW() - INTERVAL '30 minutes'),

-- Provider notifications
('not-33333333-3333-3333-3333-333333333333', 'pro-11111111-1111-1111-1111-111111111111', 'service_created',
'Novo Serviço Disponível', 'Novo serviço de limpeza disponível na sua área',
'ser-11111111-1111-1111-1111-111111111111', 'cli-11111111-1111-1111-1111-111111111111',
false, false, '{"category": "Limpeza", "location": "São Paulo", "budget_max": 350.00}', '/servicos/ser-11111111-1111-1111-1111-111111111111',
NOW() - INTERVAL '2 hours'),

('not-44444444-4444-4444-4444-444444444444', 'pro-22222222-2222-2222-2222-222222222222', 'service_created',
'Serviço Urgente Disponível', 'Serviço de instalação elétrica com urgência alta',
'ser-22222222-2222-2222-2222-222222222222', 'cli-22222222-2222-2222-2222-222222222222',
false, true, '{"category": "Elétrica", "urgency": "high", "budget_max": 500.00}', '/servicos/ser-22222222-2222-2222-2222-222222222222',
NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;
