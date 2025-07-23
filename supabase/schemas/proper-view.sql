-- create a table for agents with the following columns:
-- id, name

-- create a table for properties with the following columns:
-- id, agent_id, created_at, updated_at, title, price, address, bedrooms, bathrooms, description, status ('active', 'pending', 'sold')
-- agent_id is a foreign key to the agents table

-- create a table for inquiries with the following columns:
-- id, agent_id, property_id, created_at, name, email, phone, message
