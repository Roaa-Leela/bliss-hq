-- Representative seed for Bliss HQ, mirroring the app's realistic data (Palm Grove Villa).
-- Multilingual item text taken from the client's pre check-in sheet style.
-- Profiles/auth users are created by Supabase Auth; this seeds operational data.

-- Property
insert into properties (id, name, code, location, bhk, has_pool, guest_capacity)
values ('11111111-1111-1111-1111-111111111111', 'Palm Grove Villa', 'PGV', 'Shamirpet', 4, true, 12)
on conflict do nothing;

-- Rooms (areas)
insert into rooms (property_id, type, name, sort) values
 ('11111111-1111-1111-1111-111111111111','bedroom','Bedroom 1',1),
 ('11111111-1111-1111-1111-111111111111','bathroom','Bathroom 1',2),
 ('11111111-1111-1111-1111-111111111111','living','Living room',3),
 ('11111111-1111-1111-1111-111111111111','kitchen','Kitchen',4),
 ('11111111-1111-1111-1111-111111111111','pool','Pool area',5),
 ('11111111-1111-1111-1111-111111111111','outdoor','Outdoor & garden',6),
 ('11111111-1111-1111-1111-111111111111','safety','Safety & security',7)
on conflict do nothing;

-- Pre check-in master template
insert into checklist_templates (id, name, type, is_master)
values ('22222222-2222-2222-2222-222222222222', 'Pre check-in', 'pre_checkin', true)
on conflict do nothing;

-- Items (trilingual). room_type groups them; the engine repeats per matching room.
insert into checklist_items (template_id, room_type, text_en, text_hi, text_te, requires_photo, sort) values
 ('22222222-2222-2222-2222-222222222222','bedroom','Bed made neatly with fresh linen, pillow covers clean','बिस्तर साफ चादर से ठीक से लगा, तकिया कवर साफ','మంచం తాజా దుప్పటితో, దిండు కవర్లు శుభ్రంగా',true,1),
 ('22222222-2222-2222-2222-222222222222','bedroom','Water bottle and 2 glasses placed in the room','कमरे में पानी की बोतल और 2 गिलास रखे','గదిలో నీటి బాటిల్ మరియు 2 గ్లాసులు',false,2),
 ('22222222-2222-2222-2222-222222222222','bedroom','AC and fan are clean and working','एसी और पंखा साफ और चालू','ఏసీ, ఫ్యాన్ శుభ్రంగా, పని చేస్తున్నాయి',false,3),
 ('22222222-2222-2222-2222-222222222222','bathroom','Toiletries refilled and bath towels placed','टॉयलेटरीज़ भरीं और बाथ टॉवल रखे','టాయిలెట్రీస్ నింపారు, స్నాన తువ్వాళ్లు ఉంచారు',true,4),
 ('22222222-2222-2222-2222-222222222222','bathroom','Toilet, basin and floor cleaned, no smell','टॉयलेट, बेसिन और फर्श साफ, कोई बदबू नहीं','టాయిలెట్, బేసిన్, నేల శుభ్రం, వాసన లేదు',false,5),
 ('22222222-2222-2222-2222-222222222222','living','Cushions arranged and throws folded neatly on the sofa','सोफे पर कुशन ठीक से और थ्रो मोड़कर रखे','సోఫాపై కుషన్లు సర్ది, దుప్పట్లు మడిచి ఉంచారు',true,6),
 ('22222222-2222-2222-2222-222222222222','kitchen','Counter and sink clean and dry','काउंटर और सिंक साफ और सूखा','కౌంటర్, సింక్ శుభ్రం, పొడిగా',true,7),
 ('22222222-2222-2222-2222-222222222222','pool','Pool water clean, no leaves floating','पूल का पानी साफ, पत्ते नहीं','పూల్ నీరు శుభ్రం, ఆకులు లేవు',true,8),
 ('22222222-2222-2222-2222-222222222222','safety','Main door lock and latches working','मुख्य दरवाज़े का ताला और कुंडी ठीक','ప్రధాన తలుపు తాళం, గడియలు పనిచేస్తున్నాయి',false,9)
on conflict do nothing;

-- Link template to property
insert into property_checklists (property_id, template_id, active)
values ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222',true)
on conflict do nothing;
