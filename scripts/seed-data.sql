-- Insert service categories first
INSERT INTO service_categories (id, name, description, icon, active) VALUES
('cat-11111111-1111-1111-1111-111111111111', 'Limpeza', 'Serviços de limpeza residencial e comercial', 'cleaning', true),
('cat-22222222-2222-2222-2222-222222222222', 'Elétrica', 'Instalações e reparos elétricos', 'zap', true),
('cat-33333333-3333-3333-3333-333333333333', 'Hidráulica', 'Reparos e instalações hidráulicas', 'droplet', true),
('cat-44444444-4444-4444-4444-444444444444', 'Pintura', 'Pintura residencial e comercial', 'palette', true),
('cat-55555555-5555-5555-5555-555555555555', 'Jardinagem', 'Cuidados com jardins e plantas', 'leaf', true),
('cat-66666666-6666-6666-6666-666666666666', 'Beleza', 'Serviços de beleza e estética', 'sparkles', true),
('cat-77777777-7777-7777-7777-777777777777', 'Educação', 'Aulas particulares e cursos', 'book', true),
('cat-88888888-8888-8888-8888-888888888888', 'Tecnologia', 'Suporte técnico e desenvolvimento', 'laptop', true),
('cat-99999999-9999-9999-9999-999999999999', 'Transporte', 'Serviços de transporte e mudanças', 'truck', true),
('cat-aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Alimentação', 'Serviços de culinária e catering', 'chef-hat', true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample clients
INSERT INTO users (id, email, name, phone, user_type, location, bio, created_at) VALUES
('cli-11111111-1111-1111-1111-111111111111', 'ana.silva@email.com', 'Ana Silva', '(11) 99999-1001', 'cliente', 'São Paulo, SP - Vila Madalena', 'Empresária que valoriza qualidade e pontualidade nos serviços contratados.', NOW() - INTERVAL '30 days'),
('cli-22222222-2222-2222-2222-222222222222', 'carlos.santos@email.com', 'Carlos Santos', '(11) 99999-1002', 'cliente', 'São Paulo, SP - Moema', 'Pai de família sempre em busca de profissionais confiáveis para casa.', NOW() - INTERVAL '25 days'),
('cli-33333333-3333-3333-3333-333333333333', 'mariana.costa@email.com', 'Mariana Costa', '(11) 99999-1003', 'cliente', 'São Paulo, SP - Pinheiros', 'Arquiteta que aprecia trabalhos bem executados e com atenção aos detalhes.', NOW() - INTERVAL '20 days'),
('cli-44444444-4444-4444-4444-444444444444', 'roberto.lima@email.com', 'Roberto Lima', '(11) 99999-1004', 'cliente', 'São Paulo, SP - Itaim Bibi', 'Executivo que precisa de serviços rápidos e eficientes devido à agenda corrida.', NOW() - INTERVAL '15 days'),
('cli-55555555-5555-5555-5555-555555555555', 'lucia.fernandes@email.com', 'Lúcia Fernandes', '(11) 99999-1005', 'cliente', 'São Paulo, SP - Jardins', 'Aposentada que gosta de manter a casa sempre organizada e bem cuidada.', NOW() - INTERVAL '10 days')
ON CONFLICT (id) DO NOTHING;

-- Insert sample providers
INSERT INTO users (id, email, name, phone, user_type, location, bio, profession, specialties, hourly_rate, average_rating, total_reviews, completed_services, response_time, acceptance_rate, created_at) VALUES
('pro-11111111-1111-1111-1111-111111111111', 'maria.limpeza@email.com', 'Maria Oliveira', '(11) 99999-2001', 'prestador', 'São Paulo, SP', 'Profissional de limpeza com mais de 15 anos de experiência. Trabalho com produtos ecológicos e equipamentos modernos.', 'Diarista', ARRAY['limpeza residencial', 'limpeza comercial', 'organização', 'limpeza pós-obra'], 85.00, 4.9, 156, 189, '< 1h', 95.50, NOW() - INTERVAL '180 days'),

('pro-22222222-2222-2222-2222-222222222222', 'joao.eletricista@email.com', 'João Pereira', '(11) 99999-2002', 'prestador', 'São Paulo, SP', 'Eletricista certificado pelo CREA com especialização em automação residencial e sistemas de segurança.', 'Eletricista', ARRAY['instalações elétricas', 'automação', 'sistemas de segurança', 'manutenção'], 120.00, 4.8, 98, 112, '< 2h', 88.75, NOW() - INTERVAL '150 days'),

('pro-33333333-3333-3333-3333-333333333333', 'pedro.professor@email.com', 'Pedro Rodrigues', '(11) 99999-2003', 'prestador', 'São Paulo, SP', 'Professor de matemática e física com mestrado pela USP. Especialista em preparação para vestibulares e ENEM.', 'Professor', ARRAY['matemática', 'física', 'química', 'preparação vestibular'], 75.00, 4.95, 203, 267, '< 30min', 92.30, NOW() - INTERVAL '120 days'),

('pro-44444444-4444-4444-4444-444444444444', 'carlos.pintor@email.com', 'Carlos Mendes', '(11) 99999-2004', 'prestador', 'São Paulo, SP', 'Pintor profissional com 20 anos de experiência. Especialista em texturas decorativas e acabamentos especiais.', 'Pintor', ARRAY['pintura residencial', 'pintura comercial', 'texturas', 'verniz e esmalte'], 95.00, 4.7, 134, 156, '< 3h', 85.60, NOW() - INTERVAL '200 days'),

('pro-55555555-5555-5555-5555-555555555555', 'ana.manicure@email.com', 'Ana Beatriz', '(11) 99999-2005', 'prestador', 'São Paulo, SP', 'Manicure e pedicure profissional com curso de especialização. Atendimento domiciliar com todos os equipamentos.', 'Manicure', ARRAY['manicure', 'pedicure', 'esmaltação em gel', 'nail art'], 65.00, 4.85, 178, 234, '< 1h', 90.25, NOW() - INTERVAL '90 days'),

('pro-66666666-6666-6666-6666-666666666666', 'luis.jardineiro@email.com', 'Luís Silva', '(11) 99999-2006', 'prestador', 'São Paulo, SP', 'Jardineiro paisagista com formação técnica. Especialista em jardins residenciais e manutenção de plantas.', 'Jardineiro', ARRAY['paisagismo', 'poda', 'plantio', 'manutenção de jardins'], 70.00, 4.6, 89, 103, '< 4h', 82.40, NOW() - INTERVAL '160 days'),

('pro-77777777-7777-7777-7777-777777777777', 'fernanda.cozinheira@email.com', 'Fernanda Alves', '(11) 99999-2007', 'prestador', 'São Paulo, SP', 'Chef de cozinha especializada em eventos e aulas de culinária. Formada pelo Senac com experiência internacional.', 'Chef', ARRAY['culinária brasileira', 'culinária internacional', 'eventos', 'aulas de culinária'], 150.00, 4.9, 67, 78, '< 2h', 94.20, NOW() - INTERVAL '100 days'),

('pro-88888888-8888-8888-8888-888888888888', 'ricardo.tecnico@email.com', 'Ricardo Santos', '(11) 99999-2008', 'prestador', 'São Paulo, SP', 'Técnico em informática com especialização em redes e segurança. Atendimento residencial e empresarial.', 'Técnico em TI', ARRAY['suporte técnico', 'instalação de redes', 'segurança digital', 'backup de dados'], 100.00, 4.75, 112, 134, '< 1h', 87.90, NOW() - INTERVAL '110 days')
ON CONFLICT (id) DO NOTHING;

-- Insert sample services (some without provider, some with provider assigned)
INSERT INTO services (id, client_id, provider_id, title, description, category, budget_min, budget_max, location, latitude, longitude, urgency, status, tags, created_at) VALUES
-- Services without provider (available for proposals)
('ser-11111111-1111-1111-1111-111111111111', 'cli-11111111-1111-1111-1111-111111111111', NULL, 'Limpeza Completa Apartamento 3 Quartos', 'Preciso de limpeza completa do meu apartamento de 3 quartos, 2 banheiros, sala, cozinha e área de serviço. Apartamento bem conservado, apenas limpeza de rotina.', 'Limpeza', 200.00, 300.00, 'São Paulo, SP - Vila Madalena', -23.5505, -46.6333, 'normal', 'novo', ARRAY['limpeza', 'apartamento', '3 quartos'], NOW() - INTERVAL '2 hours'),

('ser-22222222-2222-2222-2222-222222222222', 'cli-22222222-2222-2222-2222-222222222222', NULL, 'Instalação de Ventiladores de Teto', 'Preciso instalar 4 ventiladores de teto na casa. Já tenho os ventiladores, preciso apenas da instalação. Casa com laje, pontos elétricos já existem.', 'Elétrica', 300.00, 500.00, 'São Paulo, SP - Moema', -23.5893, -46.6658, 'alta', 'novo', ARRAY['elétrica', 'instalação', 'ventiladores'], NOW() - INTERVAL '1 day'),

('ser-33333333-3333-3333-3333-333333333333', 'cli-33333333-3333-3333-3333-333333333333', NULL, 'Aulas de Matemática para Vestibular', 'Minha filha precisa de aulas particulares de matemática para se preparar para o vestibular. Ela está no 3º ano do ensino médio e tem dificuldades em funções e geometria.', 'Educação', 200.00, 400.00, 'São Paulo, SP - Pinheiros', -23.5677, -46.7019, 'normal', 'novo', ARRAY['educação', 'matemática', 'vestibular'], NOW() - INTERVAL '3 days'),

-- Services with provider assigned (in progress or completed)
('ser-44444444-4444-4444-4444-444444444444', 'cli-44444444-4444-4444-4444-444444444444', 'pro-44444444-4444-4444-4444-444444444444', 'Pintura da Sala de Estar', 'Pintura completa da sala de estar (35m²). Parede já preparada, preciso apenas da aplicação da tinta. Cor: branco gelo.', 'Pintura', 800.00, 1200.00, 'São Paulo, SP - Itaim Bibi', -23.5751, -46.6742, 'normal', 'em_andamento', ARRAY['pintura', 'sala', 'residencial'], NOW() - INTERVAL '5 days'),

('ser-55555555-5555-5555-5555-555555555555', 'cli-55555555-5555-5555-5555-555555555555', 'pro-55555555-5555-5555-5555-555555555555', 'Manicure e Pedicure Domiciliar', 'Serviço de manicure e pedicure em casa. Preciso de atendimento semanal, sempre às sextas-feiras pela manhã.', 'Beleza', 80.00, 120.00, 'São Paulo, SP - Jardins', -23.5613, -46.6563, 'baixa', 'concluido', ARRAY['beleza', 'manicure', 'domiciliar'], NOW() - INTERVAL '1 week'),

('ser-66666666-6666-6666-6666-666666666666', 'cli-11111111-1111-1111-1111-111111111111', 'pro-66666666-6666-6666-6666-666666666666', 'Manutenção do Jardim', 'Poda das plantas, limpeza do jardim e replantio de algumas mudas. Jardim de aproximadamente 50m².', 'Jardinagem', 150.00, 250.00, 'São Paulo, SP - Vila Madalena', -23.5505, -46.6333, 'baixa', 'aceito', ARRAY['jardinagem', 'poda', 'manutenção'], NOW() - INTERVAL '2 days'),

('ser-77777777-7777-7777-7777-777777777777', 'cli-22222222-2222-2222-2222-222222222222', NULL, 'Vazamento na Cozinha', 'Vazamento embaixo da pia da cozinha. Problema começou hoje de manhã e está piorando. Preciso de atendimento urgente.', 'Hidráulica', 100.00, 200.00, 'São Paulo, SP - Moema', -23.5893, -46.6658, 'urgente', 'novo', ARRAY['hidráulica', 'vazamento', 'emergência'], NOW() - INTERVAL '3 hours'),

('ser-88888888-8888-8888-8888-888888888888', 'cli-33333333-3333-3333-3333-333333333333', 'pro-77777777-7777-7777-7777-777777777777', 'Jantar para 20 Pessoas', 'Preciso de um chef para preparar jantar para 20 pessoas em casa. Evento de aniversário, cardápio brasileiro contemporâneo.', 'Alimentação', 1500.00, 2500.00, 'São Paulo, SP - Pinheiros', -23.5677, -46.7019, 'normal', 'aceito', ARRAY['culinária', 'evento', 'jantar'], NOW() - INTERVAL '1 week')
ON CONFLICT (id) DO NOTHING;

-- Insert sample proposals
INSERT INTO proposals (id, service_id, provider_id, price, description, estimated_time, materials, status, created_at) VALUES
-- Proposals for available services
('prop-11111111-1111-1111-1111-111111111111', 'ser-11111111-1111-1111-1111-111111111111', 'pro-11111111-1111-1111-1111-111111111111', 250.00, 'Realizarei a limpeza completa do seu apartamento com produtos de qualidade e equipamentos profissionais. Incluo limpeza de vidros, organização básica e aromatização dos ambientes.', '5 horas', 'Produtos de limpeza ecológicos, panos de microfibra, aspirador profissional', 'pending', NOW() - INTERVAL '1 hour'),

('prop-22222222-2222-2222-2222-222222222222', 'ser-22222222-2222-2222-2222-222222222222', 'pro-22222222-2222-2222-2222-222222222222', 400.00, 'Instalação profissional dos 4 ventiladores de teto com garantia de 1 ano. Verificarei toda a parte elétrica antes da instalação para garantir segurança.', '4 horas', 'Parafusos, buchas, fita isolante, conectores', 'pending', NOW() - INTERVAL '30 minutes'),

('prop-33333333-3333-3333-3333-333333333333', 'ser-33333333-3333-3333-3333-333333333333', 'pro-33333333-3333-3333-3333-333333333333', 300.00, 'Aulas personalizadas focadas nas dificuldades específicas da aluna. Material didático incluso e acompanhamento do progresso com relatórios mensais para os pais.', '2 horas por aula', 'Apostilas personalizadas, lista de exercícios, simulados', 'pending', NOW() - INTERVAL '2 hours'),

-- Alternative proposals for the same services
('prop-44444444-4444-4444-4444-444444444444', 'ser-11111111-1111-1111-1111-111111111111', 'pro-44444444-4444-4444-4444-444444444444', 280.00, 'Limpeza detalhada com foco na qualidade. Trabalho sozinho para garantir atenção aos detalhes. Experiência de 20 anos no ramo.', '6 horas', 'Produtos premium, enceradeira, equipamentos especializados', 'pending', NOW() - INTERVAL '45 minutes'),

('prop-55555555-5555-5555-5555-555555555555', 'ser-22222222-2222-2222-2222-222222222222', 'pro-88888888-8888-8888-8888-888888888888', 350.00, 'Instalação com teste completo do sistema elétrico. Posso também configurar controle remoto se necessário.', '3 horas', 'Materiais elétricos certificados, multímetro para testes', 'pending', NOW() - INTERVAL '1 hour'),

-- Accepted proposals (for services in progress)
('prop-66666666-6666-6666-6666-666666666666', 'ser-44444444-4444-4444-4444-444444444444', 'pro-44444444-4444-4444-4444-444444444444', 950.00, 'Pintura profissional com preparação da superfície e duas demãos de tinta. Garantia de 2 anos contra descascamento.', '2 dias', 'Tinta premium, primer, rolos e pincéis profissionais', 'accepted', NOW() - INTERVAL '5 days'),

('prop-77777777-7777-7777-7777-777777777777', 'ser-66666666-6666-6666-6666-666666666666', 'pro-66666666-6666-6666-6666-666666666666', 200.00, 'Manutenção completa do jardim com poda técnica e replantio estratégico para melhor desenvolvimento das plantas.', '1 dia', 'Mudas, adubo orgânico, ferramentas de poda', 'accepted', NOW() - INTERVAL '2 days'),

('prop-88888888-8888-8888-8888-888888888888', 'ser-88888888-8888-8888-8888-888888888888', 'pro-77777777-7777-7777-7777-777777777777', 2000.00, 'Menu degustação com 5 pratos + sobremesa. Ingredientes frescos e apresentação sofisticada. Incluo garçom para o evento.', '1 dia', 'Ingredientes premium, utensílios profissionais, decoração da mesa', 'accepted', NOW() - INTERVAL '1 week')
ON CONFLICT (id) DO NOTHING;

-- Insert sample notifications
INSERT INTO notifications (id, user_id, type, title, message, read, urgent, data, created_at) VALUES
-- Notifications for clients
('not-11111111-1111-1111-1111-111111111111', 'cli-11111111-1111-1111-1111-111111111111', 'service_request', 'Nova Proposta Recebida', 'Maria Oliveira enviou uma proposta de R$ 250,00 para seu serviço de limpeza', false, true, '{"service_id": "ser-11111111-1111-1111-1111-111111111111", "provider_name": "Maria Oliveira", "price": 250.00}', NOW() - INTERVAL '1 hour'),

('not-22222222-2222-2222-2222-222222222222', 'cli-11111111-1111-1111-1111-111111111111', 'service_request', 'Segunda Proposta Recebida', 'Carlos Mendes também enviou uma proposta para seu serviço de limpeza', false, false, '{"service_id": "ser-11111111-1111-1111-1111-111111111111", "provider_name": "Carlos Mendes", "price": 280.00}', NOW() - INTERVAL '45 minutes'),

('not-33333333-3333-3333-3333-333333333333', 'cli-22222222-2222-2222-2222-222222222222', 'service_request', 'Proposta para Instalação Elétrica', 'João Pereira enviou proposta para instalação dos ventiladores', false, true, '{"service_id": "ser-22222222-2222-2222-2222-222222222222", "provider_name": "João Pereira", "price": 400.00}', NOW() - INTERVAL '30 minutes'),

('not-44444444-4444-4444-4444-444444444444', 'cli-44444444-4444-4444-4444-444444444444', 'service_request', 'Serviço em Andamento', 'Carlos Mendes iniciou o serviço de pintura da sua sala', true, false, '{"service_id": "ser-44444444-4444-4444-4444-444444444444", "provider_name": "Carlos Mendes"}', NOW() - INTERVAL '5 days'),

('not-55555555-5555-5555-5555-555555555555', 'cli-55555555-5555-5555-5555-555555555555', 'review', 'Avalie o Serviço', 'Que tal avaliar o serviço de manicure da Ana Beatriz?', false, false, '{"service_id": "ser-55555555-5555-5555-5555-555555555555", "provider_name": "Ana Beatriz"}', NOW() - INTERVAL '1 week'),

-- Notifications for providers
('not-66666666-6666-6666-6666-666666666666', 'pro-11111111-1111-1111-1111-111111111111', 'service_request', 'Novo Serviço Disponível', 'Novo serviço de limpeza disponível na Vila Madalena', false, false, '{"service_id": "ser-11111111-1111-1111-1111-111111111111", "category": "Limpeza", "location": "Vila Madalena"}', NOW() - INTERVAL '2 hours'),

('not-77777777-7777-7777-7777-777777777777', 'pro-22222222-2222-2222-2222-222222222222', 'service_request', 'Serviço Urgente de Elétrica', 'Serviço de instalação elétrica com urgência alta em Moema', false, true, '{"service_id": "ser-22222222-2222-2222-2222-222222222222", "category": "Elétrica", "urgency": "alta"}', NOW() - INTERVAL '1 day'),

('not-88888888-8888-8888-8888-888888888888', 'pro-44444444-4444-4444-4444-444444444444', 'service_request', 'Proposta Aceita!', 'Sua proposta para pintura foi aceita por Roberto Lima', true, true, '{"service_id": "ser-44444444-4444-4444-4444-444444444444", "client_name": "Roberto Lima", "price": 950.00}', NOW() - INTERVAL '5 days'),

('not-99999999-9999-9999-9999-999999999999', 'pro-66666666-6666-6666-6666-666666666666', 'payment', 'Pagamento Recebido', 'Você recebeu R$ 200,00 pelo serviço de jardinagem', true, false, '{"service_id": "ser-66666666-6666-6666-6666-666666666666", "amount": 200.00}', NOW() - INTERVAL '2 days'),

('not-aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'pro-77777777-7777-7777-7777-777777777777', 'service_request', 'Evento Confirmado', 'Jantar para 20 pessoas confirmado para próxima semana', true, false, '{"service_id": "ser-88888888-8888-8888-8888-888888888888", "event_date": "2025-07-15", "guests": 20}', NOW() - INTERVAL '1 week')
ON CONFLICT (id) DO NOTHING;

-- Insert sample messages
INSERT INTO messages (id, service_id, sender_id, receiver_id, content, read, created_at) VALUES
-- Messages between client and provider for limpeza service
('msg-11111111-1111-1111-1111-111111111111', 'ser-11111111-1111-1111-1111-111111111111', 'cli-11111111-1111-1111-1111-111111111111', 'pro-11111111-1111-1111-1111-111111111111', 'Olá Maria! Vi sua proposta e gostei. Você pode vir amanhã pela manhã?', false, NOW() - INTERVAL '50 minutes'),

('msg-22222222-2222-2222-2222-222222222222', 'ser-11111111-1111-1111-1111-111111111111', 'pro-11111111-1111-1111-1111-111111111111', 'cli-11111111-1111-1111-1111-111111111111', 'Oi Ana! Posso sim, que horas seria melhor para você? Posso chegar às 8h da manhã.', false, NOW() - INTERVAL '45 minutes'),

('msg-33333333-3333-3333-3333-333333333333', 'ser-11111111-1111-1111-1111-111111111111', 'cli-11111111-1111-1111-1111-111111111111', 'pro-11111111-1111-1111-1111-111111111111', 'Perfeito! 8h está ótimo. O porteiro já estará avisado. Apartamento 142.', false, NOW() - INTERVAL '40 minutes'),

-- Messages for electrical service
('msg-44444444-4444-4444-4444-444444444444', 'ser-22222222-2222-2222-2222-222222222222', 'cli-22222222-2222-2222-2222-222222222222', 'pro-22222222-2222-2222-2222-222222222222', 'João, os ventiladores são da marca Ventisol. Você tem experiência com essa marca?', true, NOW() - INTERVAL '25 minutes'),

('msg-55555555-5555-5555-5555-555555555555', 'ser-22222222-2222-2222-2222-222222222222', 'pro-22222222-2222-2222-2222-222222222222', 'cli-22222222-2222-2222-2222-222222222222', 'Sim Carlos! Já instalei vários dessa marca, são de boa qualidade. Quando posso ir fazer a instalação?', false, NOW() - INTERVAL '20 minutes'),

-- Messages for painting service (in progress)
('msg-66666666-6666-6666-6666-666666666666', 'ser-44444444-4444-4444-4444-444444444444', 'pro-44444444-4444-4444-4444-444444444444', 'cli-44444444-4444-4444-4444-444444444444', 'Roberto, terminei a primeira demão hoje. Amanhã aplico a segunda e finalizo o serviço.', true, NOW() - INTERVAL '1 day'),

('msg-77777777-7777-7777-7777-777777777777', 'ser-44444444-4444-4444-4444-444444444444', 'cli-44444444-4444-4444-4444-444444444444', 'pro-44444444-4444-4444-4444-444444444444', 'Perfeito Carlos! Está ficando muito bom. Obrigado pelo capricho no trabalho.', true, NOW() - INTERVAL '23 hours'),

-- Messages for garden service
('msg-88888888-8888-8888-8888-888888888888', 'ser-66666666-6666-6666-6666-666666666666', 'cli-11111111-1111-1111-1111-111111111111', 'pro-66666666-6666-6666-6666-666666666666', 'Luís, que tipo de mudas você recomenda para o canteiro da frente?', true, NOW() - INTERVAL '1 day'),

('msg-99999999-9999-9999-9999-999999999999', 'ser-66666666-6666-6666-6666-666666666666', 'pro-66666666-6666-6666-6666-666666666666', 'cli-11111111-1111-1111-1111-111111111111', 'Ana, recomendo umas lavandas e alecrim. Ficam lindas e são fáceis de cuidar. O que acha?', true, NOW() - INTERVAL '23 hours')
ON CONFLICT (id) DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (id, service_id, client_id, provider_id, rating, comment, response, created_at) VALUES
-- Review for completed manicure service
('rev-11111111-1111-1111-1111-111111111111', 'ser-55555555-5555-5555-5555-555555555555', 'cli-55555555-5555-5555-5555-555555555555', 'pro-55555555-5555-5555-5555-555555555555', 5, 'Ana é excelente! Muito profissional, pontual e caprichosa. O resultado ficou perfeito e ela trouxe todos os materiais necessários. Super recomendo!', 'Muito obrigada Lúcia! Foi um prazer atendê-la. Fico feliz que tenha gostado do resultado. Até a próxima semana!', NOW() - INTERVAL '1 week'),

-- Review for a previous completed service (not shown in current services)
('rev-22222222-2222-2222-2222-222222222222', 'ser-99999999-9999-9999-9999-999999999999', 'cli-22222222-2222-2222-2222-222222222222', 'pro-11111111-1111-1111-1111-111111111111', 5, 'Maria fez um trabalho impecável na limpeza da minha casa. Chegou no horário, foi muito educada e deixou tudo brilhando. Já agendei para o próximo mês!', 'Fico muito feliz com seu feedback, Carlos! Obrigada pela confiança. Até o próximo mês!', NOW() - INTERVAL '2 weeks'),

('rev-33333333-3333-3333-3333-333333333333', 'ser-aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cli-33333333-3333-3333-3333-333333333333', 'pro-22222222-2222-2222-2222-222222222222', 4, 'João fez um bom trabalho na instalação elétrica. Pontual e conhece bem o que faz. Apenas demorou um pouco mais que o previsto.', 'Obrigado pela avaliação, Mariana! Peço desculpas pela demora, mas quis garantir que tudo ficasse perfeito e seguro.', NOW() - INTERVAL '3 weeks'),

('rev-44444444-4444-4444-4444-444444444444', 'ser-bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cli-44444444-4444-4444-4444-444444444444', 'pro-33333333-3333-3333-3333-333333333333', 5, 'Pedro é um excelente professor! Muito didático e paciente. Minha filha melhorou muito em matemática depois das aulas com ele.', 'Muito obrigado Roberto! Fico feliz em saber que sua filha está progredindo. É uma aluna muito dedicada!', NOW() - INTERVAL '1 month')
ON CONFLICT (id) DO NOTHING;

-- Update user ratings based on reviews
UPDATE users SET 
    average_rating = subquery.avg_rating,
    total_reviews = subquery.review_count
FROM (
    SELECT 
        provider_id,
        ROUND(AVG(rating::DECIMAL), 2) as avg_rating,
        COUNT(*) as review_count
    FROM reviews 
    GROUP BY provider_id
) AS subquery
WHERE users.id = subquery.provider_id AND users.user_type = 'prestador';

-- Update completed services count for providers
UPDATE users SET 
    completed_services = subquery.completed_count
FROM (
    SELECT 
        provider_id,
        COUNT(*) as completed_count
    FROM services 
    WHERE status = 'concluido' AND provider_id IS NOT NULL
    GROUP BY provider_id
) AS subquery
WHERE users.id = subquery.provider_id AND users.user_type = 'prestador';
