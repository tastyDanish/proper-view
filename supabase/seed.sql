-- Agents
INSERT INTO "public"."agents" ("id", "name") VALUES ('0960c5b3-6abe-417c-9dc6-c75f7b9579d0', 'Sam'), ('89c95fc8-c41a-434a-8efb-e41970bf2cfb', 'Grimble'), ('c633b284-8d40-4ae9-b18b-b8dbe63611a7', 'Peter');

-- Properties
INSERT INTO "public"."properties" ("id", "agent_id", "created_at", "updated_at", "title", "price", "street_address", "city", "bedrooms", "bathrooms", "description", "status") VALUES ('13bd545d-8afe-4ec8-921e-32ee43800065', '89c95fc8-c41a-434a-8efb-e41970bf2cfb', '2025-07-23 21:52:10.620712+00', '2025-07-23 21:52:10.620712+00', 'Cozy Cottage Near the Lake', '475000.00', '78 Lakeside Dr', 'Pleasanton', '2', '1', 'Charming 2-bedroom cottage just steps away from the lake. Perfect for weekend getaways or year-round living.', 'active'), ('2158cef4-62a1-45b2-9c11-c715ebfc20f4', 'c633b284-8d40-4ae9-b18b-b8dbe63611a7', '2025-07-23 21:52:46.458384+00', '2025-07-23 21:52:46.458384+00', 'Luxury Penthouse with City Views', '1250000.00', '455 Skyline Ave', 'Metropolis', '3', '3', 'Top-floor penthouse featuring floor-to-ceiling windows, private elevator access, and panoramic city views.', 'active'), ('354df9ff-01ff-4bdb-8b10-eba21e3fa418', '89c95fc8-c41a-434a-8efb-e41970bf2cfb', '2025-07-23 21:53:02.484222+00', '2025-07-23 21:53:02.484222+00', 'Charming Historic Bungalow', '395000.00', '210 Old Town Rd', 'Charleston', '3', '2', 'Beautifully restored 1920s bungalow with original hardwood floors and modern updates throughout.', 'active'), ('741defb0-56ad-4b59-a2d0-460deb59a2f9', 'c633b284-8d40-4ae9-b18b-b8dbe63611a7', '2025-07-23 21:07:06.388312+00', '2025-07-23 21:07:06.388312+00', 'test place', '500000.00', 'something something 123', 'Metropolis', '2', '2', 'its a lovely home', 'active'), ('902926c9-c5b0-4a4e-b597-b00da0ea68da', 'c633b284-8d40-4ae9-b18b-b8dbe63611a7', '2025-07-23 21:23:23.880581+00', '2025-07-23 21:23:23.880581+00', 'Modern Apartment in Downtown', '350000.00', '123 Main St', 'Cityville', '2', '2', 'A beautiful modern apartment located in the heart of downtown.', 'active'), ('9bb2ccf0-aee7-4fcd-a991-eafa3a7f2fe1', '0960c5b3-6abe-417c-9dc6-c75f7b9579d0', '2025-07-23 21:57:05.126194+00', '2025-07-23 21:57:05.126194+00', 'New Construction Townhome', '520000.00', '3128 Newbury Ln', 'Cityville', '3', '2.5', 'Brand new 3-bedroom townhome located minutes from downtown, with open floor plan and rooftop deck.', 'active'), ('aef8c651-0cc5-4760-8281-24f57ebdb9c3', '0960c5b3-6abe-417c-9dc6-c75f7b9579d0', '2025-07-23 21:52:32.245284+00', '2025-07-23 21:52:32.245284+00', 'Spacious Suburban Family Home', '625000.00', '908 Elm St', 'Suburbia', '4', '3', 'A spacious 4-bedroom, 3-bathroom home in a quiet family-friendly neighborhood, complete with backyard and garage.', 'active');

-- Inquiries
INSERT INTO "public"."inquiries" ("id", "agent_id", "property_id", "created_at", "name", "email", "phone", "message") VALUES ('196f4f75-cdb2-493f-8e10-ee452ca2f203', 'c633b284-8d40-4ae9-b18b-b8dbe63611a7', '741defb0-56ad-4b59-a2d0-460deb59a2f9', '2025-07-23 21:16:22.865561+00', 'Jane Doe', 'jane.doe@example.com', '+1-555-123-4567', 'I am interested in this property. Please contact me with more details.');