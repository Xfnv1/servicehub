-- =============================================================================
-- ServiceHub Database - Seed Data
-- =============================================================================
-- This file inserts initial data for development and testing
-- Execute this AFTER 05-row-level-security.sql

-- =============================================================================
-- SERVICE CATEGORIES
-- =============================================================================

INSERT INTO service_categories (id, name, slug, description, icon, color, sort_order, is_active) VALUES
('cat-11111111-1111-1111-1111-111111111111', 'Limpeza e Organização', 'limpeza-organizacao', 'Serviços de limpeza residencial, comercial e organização de ambientes', 'cleaning', '#4CAF50', 1, true),
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
-- SAMPLE USERS - CLIENTS
-- =============================================================================

INSERT INTO users (
    id, email, full_name, display_name, user_type, phone, bio, 
    address, city, state, postal_code, latitude, longitude,
    is_active, is_verified, created_at
) VALUES
('cli-11111111-1111-1111-1111-111111111111', 'ana.silva@email.com', 'Ana Silva Santos', 'Ana Silva', 'cliente', '(11) 99999-1001', 
 'Empresária do setor de marketing digital. Valorizo profissionais pontuais e que executem serviços com qualidade. Sempre busco estabelecer relacionamentos duradouros com prestadores confiáveis.',
 'Rua das Flores, 123, Apto 45', 'São Paulo', 'SP', '01234-567', -23.5505, -46.6333, true, true, NOW() - INTERVAL '45 days'),

('cli-22222222-2222-2222-2222-222222222222', 'carlos.santos@email.com', 'Carlos Roberto Santos', 'Carlos Santos', 'cliente', '(11) 99999-1002',
 'Pai de família, engenheiro civil. Procuro sempre profissionais qualificados para manutenção da casa e serviços diversos. Prezo pela segurança e qualidade do trabalho.',
 'Av. Paulista, 456, Conjunto 78', 'São Paulo', 'SP', '01310-100', -23.5618, -46.6565, true, true, NOW() - INTERVAL '30 days'),

('cli-33333333-3333-3333-3333-333333333333', 'mariana.costa@email.com', 'Mariana Costa Lima', 'Mariana Costa', 'cliente', '(11) 99999-1003',
 'Arquiteta e designer de interiores. Tenho olhar crítico para detalhes e acabamentos. Busco profissionais que compartilhem da mesma paixão pela excelência.',
 'Rua Oscar Freire, 789, Casa', 'São Paulo', 'SP', '01426-001', -23.5677, -46.7019, true, true, NOW() - INTERVAL '25 days'),

('cli-44444444-4444-4444-4444-444444444444', 'roberto.lima@email.com', 'Roberto Lima Oliveira', 'Roberto Lima', 'cliente', '(11) 99999-1004',
 'Executivo de vendas com agenda corrida. Preciso de serviços rápidos, eficientes e bem executados. Valorizo a comunicação clara e cumprimento de prazos.',
 'Av. Faria Lima, 321, Torre A', 'São Paulo', 'SP', '04538-132', -23.5751, -46.6742, true, true, NOW() - INTERVAL '20 days'),

('cli-55555555-5555-5555-5555-555555555555', 'lucia.fernandes@email.com', 'Lúcia Fernandes Almeida', 'Lúcia Fernandes', 'cliente', '(11) 99999-1005',
 'Aposentada, professora. Gosto de manter minha casa sempre organizada e bem cuidada. Aprecio profissionais educados, cuidadosos e que respeitem o ambiente doméstico.',
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
 'Profissional de limpeza com mais de 15 anos de experiência. Trabalho com produtos ecológicos e equipamentos modernos. Especialista em limpeza pós-obra e organização de ambientes.',
 'Diarista e Organizadora', ARRAY['limpeza residencial', 'limpeza comercial', 'organização', 'limpeza pós-obra'], 85.00, 15, 25,
 'Rua das Palmeiras, 456', 'São Paulo', 'SP', '02345-678', -23.5489, -46.6388,
 4.9, 156, 189, 45, 95.50, 98.40, true, true, NOW() - INTERVAL '180 days'),

('pro-22222222-2222-2222-2222-222222222222', 'joao.eletricista@email.com', 'João Pereira Silva', 'João Pereira', 'prestador', '(11) 99999-2002',
 'Eletricista certificado pelo CREA-SP com especialização em automação residencial e sistemas de segurança. Atendo emergências 24h e ofereço garantia em todos os serviços.',
 'Eletricista', ARRAY['instalações elétricas', 'automação residencial', 'sistemas de segurança', 'manutenção elétrica'], 120.00, 12, 30,
 'Av. São João, 789', 'São Paulo', 'SP', '01035-000', -23.5558, -46.6396,
 4.8, 98, 112, 60, 88.75, 96.20, true, true, NOW() - INTERVAL '150 days'),

('pro-33333333-3333-3333-3333-333333333333', 'pedro.professor@email.com', 'Pedro Rodrigues Costa', 'Pedro Rodrigues', 'prestador', '(11) 99999-2003',
 'Professor de matemática e física com mestrado pela USP. Especialista em preparação para vestibulares e ENEM. Metodologia personalizada e acompanhamento individual do progresso.',
 'Professor Particular', ARRAY['matemática', 'física', 'química', 'preparação vestibular'], 75.00, 8, 20,
 'Rua da Consolação, 234', 'São Paulo', 'SP', '01302-000', -23.5505, -46.6333,
 4.95, 203, 267, 30, 92.30, 99.10, true, true, NOW() - INTERVAL '120 days'),

('pro-44444444-4444-4444-4444-444444444444', 'carlos.pintor@email.com', 'Carlos Mendes Alves', 'Carlos Mendes', 'prestador', '(11) 99999-2004',
 'Pintor profissional com 20 anos de experiência. Especialista em texturas decorativas e acabamentos especiais. Trabalho com tintas de alta qualidade e ofereço garantia de 2 anos.',
 'Pintor', ARRAY['pintura residencial', 'pintura comercial', 'texturas decorativas', 'verniz e esmalte'], 95.00, 20, 35,
 'Rua do Paraíso, 567', 'São Paulo', 'SP', '04103-000', -23.5729, -46.6431,
 4.7, 134, 156, 90, 85.60, 94.80, true, true, NOW() - INTERVAL '200 days'),

('pro-55555555-5555-5555-5555-555555555555', 'ana.manicure@email.com', 'Ana Beatriz Costa', 'Ana Beatriz', 'prestador', '(11) 99999-2005',
 'Manicure e pedicure profissional com curso de especialização em nail art. Atendimento domiciliar com todos os equipamentos esterilizados. Produtos de alta qualidade.',
 'Manicure e Pedicure', ARRAY['manicure', 'pedicure', 'esmaltação em gel', 'nail art'], 65.00, 6, 15,
 'Rua Bela Vista, 890', 'São Paulo', 'SP', '01308-000', -23.5505, -46.6333,
 4.85, 178, 234, 40, 90.25, 97.60, true, true, NOW() - INTERVAL '90 days'),

('pro-66666666-6666-6666-6666-666666666666', 'luis.jardineiro@email.com', 'Luís Silva Santos', 'Luís Silva', 'prestador', '(11) 99999-2006',
 'Jardineiro paisagista com formação técnica em agricultura. Especialista em jardins residenciais e manutenção de plantas ornamentais. Trabalho sustentável e ecológico.',
 'Jardineiro Paisagista', ARRAY['paisagismo', 'poda de plantas', 'plantio', 'manutenção de jardins'], 70.00, 10, 20,
 'Rua Verde, 123', 'São Paulo', 'SP', '04567-890', -23.5729, -46.6431,
 4.6, 89, 103, 120, 82.40, 91.30, true, true, NOW() - INTERVAL '160 days'),

('pro-77777777-7777-7777-7777-777777777777', 'fernanda.cozinheira@email.com', 'Fernanda Alves Lima', 'Fernanda Alves', 'prestador', '(11) 99999-2007',
 'Chef de cozinha especializada em eventos e aulas de culinária. Formada pelo Senac com experiência internacional. Cardápios personalizados e ingredientes selecionados.',
 'Chef de Cozinha', ARRAY['culinária brasileira', 'culinária internacional', 'eventos', 'aulas de culinária'], 150.00, 12, 40,
 'Av. Rebouças, 345', 'São Paulo', 'SP', '05401-000', -23.5677, -46.7019,
 4.9, 67, 78, 90, 94.20, 98.70, true, true, NOW() - INTERVAL '100 days'),

('pro-88888888-8888-8888-8888-888888888888', 'ricardo.tecnico@email.com', 'Ricardo Santos Oliveira', 'Ricardo Santos', 'prestador', '(11) 99999-2008',
 'Técnico em informática com especialização em redes e segurança digital. Atendimento residencial e empresarial. Suporte remoto e presencial disponível.',
 'Técnico em TI', ARRAY['suporte técnico', 'instalação de redes', 'segurança digital', 'backup de dados'], 100.00, 9, 25,
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
-- Available services (no provider assigned)
('ser-11111111-1111-1111-1111-111111111111', 'cli-11111111-1111-1111-1111-111111111111', NULL, 'cat-11111111-1111-1111-1111-111111111111',
 'Limpeza Completa Apartamento 3 Quartos', 
 'Preciso de limpeza completa do meu apartamento de 3 quartos, 2 banheiros, sala, cozinha e área de serviço. Apartamento bem conservado, apenas limpeza de rotina mensal. Inclui limpeza de vidros e organização básica.',
 ARRAY['produtos de limpeza ecológicos', 'equipamentos próprios', 'experiência com apartamentos'],
 200.00, 350.00, 'Rua das Flores, 123, Apto 45', 'São Paulo', 'SP', '01234-567', -23.5505, -46.6333,
 'normal', 'published', NOW() + INTERVAL '3 days', 5, 
 ARRAY['limpeza', 'apartamento', '3 quartos', 'mensal'], NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours'),

('ser-22222222-2222-2222-2222-222222222222', 'cli-22222222-2222-2222-2222-222222222222', NULL, 'cat-22222222-2222-2222-2222-222222222222',
 'Instalação de 4 Ventiladores de Teto',
 'Preciso instalar 4 ventiladores de teto na casa (2 nos quartos, 1 na sala, 1 na cozinha). Já tenho os ventiladores comprados, preciso apenas da instalação. Casa com laje, pontos elétricos já existem.',
 ARRAY['experiência com instalações elétricas', 'ferramentas próprias', 'certificação CREA'],
 300.00, 500.00, 'Av. Paulista, 456, Conjunto 78', 'São Paulo', 'SP', '01310-100', -23.5618, -46.6565,
 'high', 'published', NOW() + INTERVAL '2 days', 4,
 ARRAY['elétrica', 'instalação', 'ventiladores', 'urgente'], NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),

('ser-33333333-3333-3333-3333-333333333333', 'cli-33333333-3333-3333-3333-333333333333', NULL, 'cat-77777777-7777-7777-7777-777777777777',
 'Aulas de Matemática para Vestibular',
 'Minha filha está no 3º ano do ensino médio e precisa de aulas particulares de matemática para se preparar para o vestibular. Ela tem dificuldades específicas em funções e geometria analítica.',
 ARRAY['experiência com ensino médio', 'preparação vestibular', 'material didático incluso'],
 200.00, 400.00, 'Rua Oscar Freire, 789, Casa', 'São Paulo', 'SP', '01426-001', -23.5677, -46.7019,
 'normal', 'published', NOW() + INTERVAL '1 week', 2,
 ARRAY['educação', 'matemática', 'vestibular', 'ensino médio'], NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),

-- Services with providers assigned
('ser-44444444-4444-4444-4444-444444444444', 'cli-44444444-4444-4444-4444-444444444444', 'pro-44444444-4444-4444-4444-444444444444', 'cat-44444444-4444-4444-4444-444444444444',
 'Pintura Completa da Sala de Estar',
 'Pintura completa da sala de estar (35m²). Parede já preparada, preciso apenas da aplicação da tinta. Cor escolhida: branco gelo. Inclui rodapés e detalhes.',
 ARRAY['tinta de qualidade', 'acabamento perfeito', 'limpeza pós-serviço'],
 800.00, 1200.00, 'Av. Faria Lima, 321, Torre A', 'São Paulo', 'SP', '04538-132', -23.5751, -46.6742,
 'normal', 'in_progress', NOW() + INTERVAL '1 day', 16,
 ARRAY['pintura', 'sala', 'residencial', 'branco'], NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

('ser-55555555-5555-5555-5555-555555555555', 'cli-55555555-5555-5555-5555-555555555555', 'pro-55555555-5555-5555-5555-555555555555', 'cat-66666666-6666-6666-6666-666666666666',
 'Manicure e Pedicure Domiciliar Semanal',
 'Serviço de manicure e pedicure em casa. Preciso de atendimento semanal, sempre às sextas-feiras pela manhã. Tenho todos os esmaltes, preciso apenas do serviço.',
 ARRAY['pontualidade', 'materiais esterilizados', 'atendimento domiciliar'],
 80.00, 120.00, 'Rua Augusta, 654, Apto 12', 'São Paulo', 'SP', '01305-000', -23.5613, -46.6563,
 'low', 'completed', NOW() - INTERVAL '2 days', 2,
 ARRAY['beleza', 'manicure', 'domiciliar', 'semanal'], NOW() - INTERVAL '1 week', NOW() - INTERVAL '1 week'),

('ser-66666666-6666-6666-6666-666666666666', 'cli-11111111-1111-1111-1111-111111111111', 'pro-66666666-6666-6666-6666-666666666666', 'cat-55555555-5555-5555-5555-555555555555',
 'Manutenção Completa do Jardim',
 'Poda das plantas, limpeza do jardim, replantio de algumas mudas e adubação. Jardim de aproximadamente 50m² com diversas plantas ornamentais.',
 ARRAY['conhecimento em plantas', 'ferramentas de poda', 'mudas de qualidade'],
 150.00, 250.00, 'Rua das Flores, 123, Apto 45', 'São Paulo', 'SP', '01234-567', -23.5505, -46.6333,
 'low', 'assigned', NOW() + INTERVAL '3 days', 6,
 ARRAY['jardinagem', 'poda', 'manutenção', 'plantas'], NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),

('ser-77777777-7777-7777-7777-777777777777', 'cli-22222222-2222-2222-2222-222222222222', NULL, 'cat-33333333-3333-3333-3333-333333333333',
 'Vazamento Urgente na Cozinha',
 'Vazamento embaixo da pia da cozinha. O problema começou hoje de manhã e está piorando. Preciso de atendimento urgente para evitar danos maiores.',
 ARRAY['atendimento emergencial', 'ferramentas hidráulicas', 'peças de reposição'],
 100.00, 200.00, 'Av. Paulista, 456, Conjunto 78', 'São Paulo', 'SP', '01310-100', -23.5618, -46.6565,
 'urgent', 'published', NOW() + INTERVAL '4 hours', 2,
 ARRAY['hidráulica', 'vazamento', 'emergência', 'cozinha'], NOW() - INTERVAL '3 hours', NOW() - INTERVAL '3 hours'),

('ser-88888888-8888-8888-8888-888888888888', 'cli-33333333-3333-3333-3333-333333333333', 'pro-77777777-7777-7777-7777-777777777777', 'cat-aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
 'Jantar Especial para 20 Pessoas',
 'Preciso de um chef para preparar jantar especial para 20 pessoas em casa. Evento de aniversário, cardápio brasileiro contemporâneo. Inclui entrada, prato principal e sobremesa.',
 ARRAY['cardápio personalizado', 'ingredientes frescos', 'apresentação sofisticada'],
 1500.00, 2500.00, 'Rua Oscar Freire, 789, Casa', 'São Paulo', 'SP', '01426-001', -23.5677, -46.7019,
 'normal', 'assigned', NOW() + INTERVAL '1 week', 8,
 ARRAY['culinária', 'evento', 'jantar', '20 pessoas'], NOW() - INTERVAL '1 week', NOW() - INTERVAL '1 week')
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- SAMPLE PROPOSALS
-- =============================================================================

INSERT INTO proposals (
    id, service_id, provider_id, message, price, estimated_duration_hours,
    available_from, available_until, materials_included, materials_description,
    warranty_months, status, expires_at, created_at
) VALUES
-- Proposals for available services
('prop-11111111-1111-1111-1111-111111111111', 'ser-11111111-1111-1111-1111-111111111111', 'pro-11111111-1111-1111-1111-111111111111',
 'Olá Ana! Tenho mais de 15 anos de experiência em limpeza residencial. Realizarei a limpeza completa do seu apartamento com produtos ecológicos e equipamentos profissionais. Incluo limpeza de vidros, organização básica e aromatização dos ambientes. Posso atender na data solicitada.',
 280.00, 5, NOW() + INTERVAL '2 days', NOW() + INTERVAL '1 week', true,
 'Produtos de limpeza ecológicos, panos de microfibra, aspirador profissional, aromatizadores',
 1, 'pending', NOW() + INTERVAL '5 days', NOW() - INTERVAL '1 hour'),

('prop-22222222-2222-2222-2222-222222222222', 'ser-22222222-2222-2222-2222-222222222222', 'pro-22222222-2222-2222-2222-222222222222',
 'Oi Carlos! Sou eletricista certificado pelo CREA-SP. Posso instalar os 4 ventiladores com total segurança e garantia de 1 ano. Verificarei toda a parte elétrica antes da instalação. Tenho disponibilidade para amanhã mesmo, considerando a urgência.',
 420.00, 4, NOW() + INTERVAL '1 day', NOW() + INTERVAL '3 days', true,
 'Parafusos, buchas, fita isolante, conectores elétricos certificados',
 12, 'pending', NOW() + INTERVAL '6 days', NOW() - INTERVAL '30 minutes'),

('prop-33333333-3333-3333-3333-333333333333', 'ser-33333333-3333-3333-3333-333333333333', 'pro-33333333-3333-3333-3333-333333333333',
 'Olá Mariana! Sou professor de matemática com mestrado pela USP. Tenho experiência específica com preparação para vestibular. Posso ajudar sua filha com funções e geometria analítica usando metodologia personalizada. Incluo material didático e acompanhamento do progresso.',
 320.00, 2, NOW() + INTERVAL '1 week', NOW() + INTERVAL '2 weeks', true,
 'Apostilas personalizadas, lista de exercícios, simulados, acesso a plataforma online',
 0, 'pending', NOW() + INTERVAL '7 days', NOW() - INTERVAL '2 hours'),

-- Alternative proposals for same services
('prop-44444444-4444-4444-4444-444444444444', 'ser-11111111-1111-1111-1111-111111111111', 'pro-44444444-4444-4444-4444-444444444444',
 'Oi Ana! Embora seja pintor, também faço serviços de limpeza detalhada. Trabalho sozinho para garantir atenção aos detalhes. Tenho 20 anos de experiência e posso incluir pequenos retoques de tinta se necessário.',
 320.00, 6, NOW() + INTERVAL '3 days', NOW() + INTERVAL '1 week', true,
 'Produtos premium de limpeza, enceradeira, equipamentos especializados',
 0, 'pending', NOW() + INTERVAL '5 days', NOW() - INTERVAL '45 minutes'),

('prop-55555555-5555-5555-5555-555555555555', 'ser-22222222-2222-2222-2222-222222222222', 'pro-88888888-8888-8888-8888-888888888888',
 'Olá Carlos! Embora seja técnico em TI, também tenho conhecimentos em elétrica básica. Posso instalar os ventiladores com segurança e ainda configurar controle remoto se necessário. Preço competitivo!',
 380.00, 5, NOW() + INTERVAL '2 days', NOW() + INTERVAL '4 days', true,
 'Materiais elétricos certificados, multímetro para testes, suporte técnico',
 6, 'pending', NOW() + INTERVAL '6 days', NOW() - INTERVAL '1 hour'),

-- Accepted proposals (for services in progress)
('prop-66666666-6666-6666-6666-666666666666', 'ser-44444444-4444-4444-4444-444444444444', 'pro-44444444-4444-4444-4444-444444444444',
 'Olá Roberto! Sou pintor profissional com 20 anos de experiência. Realizarei a pintura da sua sala com tinta de primeira qualidade e acabamento perfeito. Garantia de 2 anos contra descascamento. Posso iniciar amanhã.',
 1050.00, 16, NOW() + INTERVAL '1 day', NOW() + INTERVAL '3 days', true,
 'Tinta premium branco gelo, primer, rolos e pincéis profissionais, proteção para móveis',
 24, 'accepted', NOW() + INTERVAL '7 days', NOW() - INTERVAL '5 days'),

('prop-77777777-7777-7777-7777-777777777777', 'ser-66666666-6666-6666-6666-666666666666', 'pro-66666666-6666-6666-6666-666666666666',
 'Oi Ana! Sou jardineiro paisagista com formação técnica. Farei a manutenção completa do seu jardim com poda técnica e replantio estratégico. Trabalho sustentável e ecológico.',
 220.00, 6, NOW() + INTERVAL '3 days', NOW() + INTERVAL '1 week', true,
 'Mudas selecionadas, adubo orgânico, ferramentas de poda profissionais',
 3, 'accepted', NOW() + INTERVAL '7 days', NOW() - INTERVAL '2 days'),

('prop-88888888-8888-8888-8888-888888888888', 'ser-88888888-8888-8888-8888-888888888888', 'pro-77777777-7777-7777-7777-777777777777',
 'Olá Mariana! Sou chef especializada em eventos. Prepararei um menu degustação brasileiro contemporâneo com 5 pratos + sobremesa. Ingredientes frescos e apresentação sofisticada. Incluo garçom para o evento.',
 2200.00, 8, NOW() + INTERVAL '1 week', NOW() + INTERVAL '10 days', true,
 'Ingredientes premium selecionados, utensílios profissionais, decoração da mesa, garçom',
 0, 'accepted', NOW() + INTERVAL '7 days', NOW() - INTERVAL '1 week')
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

('not-22222222-2222-2222-2222-222222222222', 'cli-11111111-1111-1111-1111-111111111111', 'proposal_received',
 'Segunda Proposta Recebida', 'Carlos Mendes também enviou uma proposta para seu serviço de limpeza',
 'ser-11111111-1111-1111-1111-111111111111', 'pro-44444444-4444-4444-4444-444444444444',
 false, false, '{"price": 320.00, "provider_name": "Carlos Mendes"}', '/servicos/ser-11111111-1111-1111-1111-111111111111',
 NOW() - INTERVAL '45 minutes'),

('not-33333333-3333-3333-3333-333333333333', 'cli-22222222-2222-2222-2222-222222222222', 'proposal_received',
 'Proposta para Instalação Elétrica', 'João Pereira enviou proposta para instalação dos ventiladores',
 'ser-22222222-2222-2222-2222-222222222222', 'pro-22222222-2222-2222-2222-222222222222',
 false, true, '{"price": 420.00, "provider_name": "João Pereira"}', '/servicos/ser-22222222-2222-2222-2222-222222222222',
 NOW() - INTERVAL '30 minutes'),

('not-44444444-4444-4444-4444-444444444444', 'cli-44444444-4444-4444-4444-444444444444', 'service_started',
 'Serviço Iniciado', 'Carlos Mendes iniciou o serviço de pintura da sua sala',
 'ser-44444444-4444-4444-4444-444444444444', 'pro-44444444-4444-4444-4444-444444444444',
 true, false, '{"provider_name": "Carlos Mendes", "service_title": "Pintura Completa da Sala de Estar"}', '/servicos/ser-44444444-4444-4444-4444-444444444444',
 NOW() - INTERVAL '5 days'),

('not-55555555-5555-5555-5555-555555555555', 'cli-55555555-5555-5555-5555-555555555555', 'service_completed',
 'Serviço Concluído', 'Ana Beatriz concluiu o serviço de manicure. Que tal avaliar?',
 'ser-55555555-5555-5555-5555-555555555555', 'pro-55555555-5555-5555-5555-555555555555',
 false, false, '{"provider_name": "Ana Beatriz", "service_title": "Manicure e Pedicure Domiciliar Semanal"}', '/avaliar/ser-55555555-5555-5555-5555-555555555555',
 NOW() - INTERVAL '2 days'),

-- Provider notifications
('not-66666666-6666-6666-6666-666666666666', 'pro-11111111-1111-1111-1111-111111111111', 'service_created',
 'Novo Serviço Disponível', 'Novo serviço de limpeza disponível na Vila Madalena',
 'ser-11111111-1111-1111-1111-111111111111', 'cli-11111111-1111-1111-1111-111111111111',
 false, false, '{"category": "Limpeza", "location": "Vila Madalena", "budget_max": 350.00}', '/servicos/ser-11111111-1111-1111-1111-111111111111',
 NOW() - INTERVAL '2 hours'),

('not-77777777-7777-7777-7777-777777777777', 'pro-22222222-2222-2222-2222-222222222222', 'service_created',
 'Serviço Urgente Disponível', 'Serviço de instalação elétrica com urgência alta em Moema',
 'ser-22222222-2222-2222-2222-222222222222', 'cli-22222222-2222-2222-2222-222222222222',
 false, true, '{"category": "Elétrica", "urgency": "high", "budget_max": 500.00}', '/servicos/ser-22222222-2222-2222-2222-222222222222',
 NOW() - INTERVAL '1 day'),

('not-88888888-8888-8888-8888-888888888888', 'pro-44444444-4444-4444-4444-444444444444', 'proposal_accepted',
 'Proposta Aceita!', 'Sua proposta para pintura foi aceita por Roberto Lima',
 'ser-44444444-4444-4444-4444-444444444444', 'cli-44444444-4444-4444-4444-444444444444',
 true, true, '{"client_name": "Roberto Lima", "price": 1050.00, "service_title": "Pintura Completa da Sala de Estar"}', '/servicos/ser-44444444-4444-4444-4444-444444444444',
 NOW() - INTERVAL '5 days'),

('not-99999999-9999-9999-9999-999999999999', 'pro-66666666-6666-6666-6666-666666666666', 'proposal_accepted',
 'Proposta Aceita', 'Ana Silva aceitou sua proposta para manutenção do jardim',
 'ser-66666666-6666-6666-6666-666666666666', 'cli-11111111-1111-1111-1111-111111111111',
 true, false, '{"client_name": "Ana Silva", "price": 220.00, "service_title": "Manutenção Completa do Jardim"}', '/servicos/ser-66666666-6666-6666-6666-666666666666',
 NOW() - INTERVAL '2 days'),

('not-aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'pro-77777777-7777-7777-7777-777777777777', 'proposal_accepted',
 'Evento Confirmado', 'Mariana Costa confirmou o jantar para 20 pessoas',
 'ser-88888888-8888-8888-8888-888888888888', 'cli-33333333-3333-3333-3333-333333333333',
 true, false, '{"client_name": "Mariana Costa", "event_date": "2025-07-15", "guests": 20, "price": 2200.00}', '/servicos/ser-88888888-8888-8888-8888-888888888888',
 NOW() - INTERVAL '1 week')
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- SAMPLE MESSAGES
-- =============================================================================

INSERT INTO messages (
    id, service_id, sender_id, receiver_id, content, message_type, is_read, created_at
) VALUES
-- Conversation for cleaning service
('msg-11111111-1111-1111-1111-111111111111', 'ser-11111111-1111-1111-1111-111111111111', 
 'cli-11111111-1111-1111-1111-111111111111', 'pro-11111111-1111-1111-1111-111111111111',
 'Olá Maria! Vi sua proposta e gostei muito. Você pode vir na quinta-feira pela manhã?', 'text', false, NOW() - INTERVAL '50 minutes'),

('msg-22222222-2222-2222-2222-222222222222', 'ser-11111111-1111-1111-1111-111111111111',
 'pro-11111111-1111-1111-1111-111111111111', 'cli-11111111-1111-1111-1111-111111111111',
 'Oi Ana! Posso sim, que horas seria melhor para você? Posso chegar às 8h da manhã se for conveniente.', 'text', false, NOW() - INTERVAL '45 minutes'),

('msg-33333333-3333-3333-3333-333333333333', 'ser-11111111-1111-1111-1111-111111111111',
 'cli-11111111-1111-1111-1111-111111111111', 'pro-11111111-1111-1111-1111-111111111111',
 'Perfeito! 8h está ótimo. O porteiro já estará avisado. Apartamento 45, 4º andar. Obrigada!', 'text', false, NOW() - INTERVAL '40 minutes'),

-- Conversation for electrical service
('msg-44444444-4444-4444-4444-444444444444', 'ser-22222222-2222-2222-2222-222222222222',
 'cli-22222222-2222-2222-2222-222222222222', 'pro-22222222-2222-2222-2222-222222222222',
 'João, os ventiladores são da marca Ventisol, modelo Spirit. Você tem experiência com essa marca?', 'text', true, NOW() - INTERVAL '25 minutes'),

('msg-55555555-5555-5555-5555-555555555555', 'ser-22222222-2222-2222-2222-222222222222',
 'pro-22222222-2222-2222-2222-222222222222', 'cli-22222222-2222-2222-2222-222222222222',
 'Sim Carlos! Já instalei vários dessa marca, são de boa qualidade e fáceis de instalar. Quando posso ir fazer a instalação?', 'text', false, NOW() - INTERVAL '20 minutes'),

-- Conversation for painting service (in progress)
('msg-66666666-6666-6666-6666-666666666666', 'ser-44444444-4444-4444-4444-444444444444',
 'pro-44444444-4444-4444-4444-444444444444', 'cli-44444444-4444-4444-4444-444444444444',
 'Roberto, terminei a primeira demão hoje. Amanhã aplico a segunda demão e finalizo o serviço. Está ficando muito bom!', 'text', true, NOW() - INTERVAL '1 day'),

('msg-77777777-7777-7777-7777-777777777777', 'ser-44444444-4444-4444-4444-444444444444',
 'cli-44444444-4444-4444-4444-444444444444', 'pro-44444444-4444-4444-4444-444444444444',
 'Perfeito Carlos! Estou vendo que está ficando excelente. Obrigado pelo capricho e atenção aos detalhes.', 'text', true, NOW() - INTERVAL '23 hours'),

-- Conversation for garden service
('msg-88888888-8888-8888-8888-888888888888', 'ser-66666666-6666-6666-6666-666666666666',
 'cli-11111111-1111-1111-1111-111111111111', 'pro-66666666-6666-6666-6666-666666666666',
 'Luís, que tipo de mudas você recomenda para o canteiro da frente? Quero algo colorido mas fácil de cuidar.', 'text', true, NOW() - INTERVAL '1 day'),

('msg-99999999-9999-9999-9999-999999999999', 'ser-66666666-6666-6666-6666-666666666666',
 'pro-66666666-6666-6666-6666-666666666666', 'cli-11111111-1111-1111-1111-111111111111',
 'Ana, recomendo umas lavandas e alecrim para dar cor e perfume. São lindas, resistentes e ainda servem para tempero! O que acha?', 'text', true, NOW() - INTERVAL '23 hours')
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- SAMPLE REVIEWS
-- =============================================================================

INSERT INTO reviews (
    id, service_id, reviewer_id, reviewed_id, rating, title, comment, review_type,
    is_verified, response, response_at, created_at
) VALUES
-- Review for completed manicure service
('rev-11111111-1111-1111-1111-111111111111', 'ser-55555555-5555-5555-5555-555555555555',
 'cli-55555555-5555-5555-5555-555555555555', 'pro-55555555-5555-5555-5555-555555555555',
 5, 'Excelente profissional!', 
 'Ana é uma excelente profissional! Muito pontual, caprichosa e educada. O resultado ficou perfeito e ela trouxe todos os materiais necessários esterilizados. Super recomendo para quem busca qualidade!',
 'client_to_provider', true,
 'Muito obrigada Lúcia! Foi um prazer atendê-la. Fico muito feliz que tenha gostado do resultado. Até a próxima semana!',
 NOW() - INTERVAL '6 days', NOW() - INTERVAL '1 week'),

-- Reviews for previous completed services (sample data)
('rev-22222222-2222-2222-2222-222222222222', 'ser-99999999-9999-9999-9999-999999999999',
 'cli-22222222-2222-2222-2222-222222222222', 'pro-11111111-1111-1111-1111-111111111111',
 5, 'Limpeza impecável',
 'Maria fez um trabalho impecável na limpeza da minha casa. Chegou pontualmente no horário combinado, foi muito educada e respeitosa, e deixou tudo absolutamente brilhando. Já agendei para o próximo mês!',
 'client_to_provider', true,
 'Fico muito feliz com seu feedback, Carlos! Obrigada pela confiança e por me recomendar para seus vizinhos. Até o próximo mês!',
 NOW() - INTERVAL '13 days', NOW() - INTERVAL '2 weeks'),

('rev-33333333-3333-3333-3333-333333333333', 'ser-aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
 'cli-33333333-3333-3333-3333-333333333333', 'pro-22222222-2222-2222-2222-222222222222',
 4, 'Bom trabalho elétrico',
 'João fez um bom trabalho na instalação elétrica da minha casa. É pontual, conhece bem o que faz e trabalha com segurança. Apenas demorou um pouco mais que o previsto, mas o resultado final foi satisfatório.',
 'client_to_provider', true,
 'Obrigado pela avaliação, Mariana! Peço desculpas pela demora, mas quis garantir que tudo ficasse perfeito e principalmente seguro. Segurança elétrica não tem pressa!',
 NOW() - INTERVAL '20 days', NOW() - INTERVAL '3 weeks'),

('rev-44444444-4444-4444-4444-444444444444', 'ser-bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
 'cli-44444444-4444-4444-4444-444444444444', 'pro-33333333-3333-3333-3333-333333333333',
 5, 'Professor excepcional',
 'Pedro é um excelente professor! Muito didático, paciente e dedicado. Minha filha melhorou significativamente em matemática depois das aulas com ele. Metodologia personalizada e acompanhamento constante do progresso.',
 'client_to_provider', true,
 'Muito obrigado Roberto! Fico muito feliz em saber que sua filha está progredindo. Ela é uma aluna muito dedicada e inteligente. Sucesso no vestibular!',
 NOW() - INTERVAL '27 days', NOW() - INTERVAL '1 month'),

-- Provider reviewing client
('rev-55555555-5555-5555-5555-555555555555', 'ser-55555555-5555-5555-5555-555555555555',
 'pro-55555555-5555-5555-5555-555555555555', 'cli-55555555-5555-5555-5555-555555555555',
 5, 'Cliente maravilhosa',
 'Lúcia é uma cliente maravilhosa! Muito educada, organizada e sempre tem tudo preparado para o atendimento. Casa sempre limpa e ambiente muito agradável. Recomendo para outros profissionais!',
 'provider_to_client', true, NULL, NULL, NOW() - INTERVAL '6 days')
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- UPDATE STATISTICS BASED ON SAMPLE DATA
-- =============================================================================

-- Update user ratings and statistics based on inserted reviews
SELECT update_user_rating('pro-11111111-1111-1111-1111-111111111111');
SELECT update_user_rating('pro-22222222-2222-2222-2222-222222222222');
SELECT update_user_rating('pro-33333333-3333-3333-3333-333333333333');
SELECT update_user_rating('pro-55555555-5555-5555-5555-555555555555');

-- Update service proposal counts
SELECT update_service_proposal_count('ser-11111111-1111-1111-1111-111111111111');
SELECT update_service_proposal_count('ser-22222222-2222-2222-2222-222222222222');
SELECT update_service_proposal_count('ser-33333333-3333-3333-3333-333333333333');

-- Update user service statistics
SELECT update_user_service_stats('cli-11111111-1111-1111-1111-111111111111');
SELECT update_user_service_stats('cli-22222222-2222-2222-2222-222222222222');
SELECT update_user_service_stats('cli-33333333-3333-3333-3333-333333333333');
SELECT update_user_service_stats('cli-44444444-4444-4444-4444-444444444444');
SELECT update_user_service_stats('cli-55555555-5555-5555-5555-555555555555');

SELECT update_user_service_stats('pro-11111111-1111-1111-1111-111111111111');
SELECT update_user_service_stats('pro-22222222-2222-2222-2222-222222222222');
SELECT update_user_service_stats('pro-33333333-3333-3333-3333-333333333333');
SELECT update_user_service_stats('pro-44444444-4444-4444-4444-444444444444');
SELECT update_user_service_stats('pro-55555555-5555-5555-5555-555555555555');
SELECT update_user_service_stats('pro-66666666-6666-6666-6666-666666666666');
SELECT update_user_service_stats('pro-77777777-7777-7777-7777-777777777777');
SELECT update_user_service_stats('pro-88888888-8888-8888-8888-888888888888');
