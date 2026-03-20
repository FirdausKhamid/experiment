SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict 9JRPBa8zKndI3nc2sQvKiJW1wWOUGUE30fltUn0peAPVHs3sI2xJoYbVSvyN5El

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: features; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."features" ("id", "key", "is_enabled", "description", "updated_at") VALUES
	(1, 'home', true, 'Dashboard home', '2026-03-09 23:27:20.040504+00'),
	(2, 'feature-a', true, 'Feature A', '2026-03-09 23:27:20.040504+00'),
	(5, 'users', true, 'Users management', '2026-03-09 23:27:20.040504+00'),
	(7, 'region_management', true, 'Region management under Permissions', '2026-03-09 23:27:20.040504+00'),
	(8, 'role_management', true, 'Role management under Permissions', '2026-03-09 23:27:20.040504+00'),
	(9, 'user_management', true, 'Users management under Permissions', '2026-03-09 23:27:20.040504+00'),
	(10, 'settings', true, 'Settings', '2026-03-09 23:27:20.040504+00'),
	(3, 'feature-b', true, 'Feature B', '2026-03-10 16:32:36.436584+00'),
	(11, 'feature_management', true, 'Feature management under Permissions tab', '2026-03-10 19:07:39.481439+00'),
	(6, 'permissions', true, 'Permissions hub test 5', '2026-03-10 22:57:37.101981+00'),
	(4, 'feature-c', false, 'Feature C ABC', '2026-03-10 22:58:38.022056+00');


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."groups" ("id", "name", "created_at") VALUES
	('admin', 'Administrator', '2026-03-10 14:29:56.636875+00'),
	('manager', 'Manager', '2026-03-10 14:29:56.636875+00'),
	('viewer', 'Viewer', '2026-03-10 14:29:56.636875+00');


--
-- Data for Name: overrides; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."overrides" ("id", "feature_id", "target_type", "target_id", "is_enabled", "created_at") VALUES
	(1, 1, 'user', '95c397f5-3a67-4fc7-bb82-abb628223778', true, '2026-03-10 22:15:13.063307+00'),
	(2, 2, 'user', '95c397f5-3a67-4fc7-bb82-abb628223778', true, '2026-03-10 22:15:13.063307+00'),
	(4, 4, 'user', '95c397f5-3a67-4fc7-bb82-abb628223778', false, '2026-03-10 22:15:13.063307+00'),
	(5, 5, 'user', '95c397f5-3a67-4fc7-bb82-abb628223778', true, '2026-03-10 22:15:13.063307+00'),
	(6, 6, 'user', '95c397f5-3a67-4fc7-bb82-abb628223778', true, '2026-03-10 22:15:13.063307+00'),
	(7, 7, 'user', '95c397f5-3a67-4fc7-bb82-abb628223778', true, '2026-03-10 22:15:13.063307+00'),
	(8, 8, 'user', '95c397f5-3a67-4fc7-bb82-abb628223778', true, '2026-03-10 22:15:13.063307+00'),
	(9, 9, 'user', '95c397f5-3a67-4fc7-bb82-abb628223778', true, '2026-03-10 22:15:13.063307+00'),
	(11, 11, 'user', '95c397f5-3a67-4fc7-bb82-abb628223778', true, '2026-03-10 22:15:13.063307+00'),
	(13, 5, 'region', 'CA', true, '2026-03-10 22:28:07.634515+00'),
	(10, 10, 'user', '95c397f5-3a67-4fc7-bb82-abb628223778', false, '2026-03-10 22:15:13.063307+00'),
	(3, 3, 'user', '95c397f5-3a67-4fc7-bb82-abb628223778', true, '2026-03-10 22:15:13.063307+00'),
	(14, 2, 'user', '1d03cb90-fbbc-46e3-a873-7901cf3856f9', false, '2026-03-10 22:33:01.125776+00'),
	(15, 1, 'user', '045fb90f-9347-4873-8ac3-ce50b97242a0', true, '2026-03-10 22:59:08.720887+00'),
	(16, 2, 'user', '045fb90f-9347-4873-8ac3-ce50b97242a0', true, '2026-03-10 22:59:08.720887+00'),
	(17, 3, 'user', '045fb90f-9347-4873-8ac3-ce50b97242a0', true, '2026-03-10 22:59:08.720887+00'),
	(18, 4, 'user', '045fb90f-9347-4873-8ac3-ce50b97242a0', true, '2026-03-10 22:59:08.720887+00');


--
-- Data for Name: regions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."regions" ("id", "name", "created_at") VALUES
	('US', 'United States', '2026-03-10 14:29:56.636875+00'),
	('CA', 'Canada', '2026-03-10 14:29:56.636875+00'),
	('GB', 'United Kingdom', '2026-03-10 14:29:56.636875+00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "username", "password_hash", "group_id", "region_id", "created_at") VALUES
	('045fb90f-9347-4873-8ac3-ce50b97242a0', 'superadmin', '$2b$10$QM40.fme/ETFSsflx3zVQeRj/ndJEE66kL1wjm84tWdXtPJ1970OO', NULL, NULL, '2026-03-09 18:59:04.820278+00'),
	('582d935b-cbcb-48ab-9e53-a6b930de603b', 'alice-admin-US', '$2b$10$23Fh2DDOoABysmBwONTesurjlRnTpZl52XNwopa/vAEn78B0VRLIi', 'admin', 'US', '2026-03-10 14:29:56.636875+00'),
	('d7252476-8b04-4d5c-b176-a50f8e881ddf', 'bob-manager-CA', '$2b$10$23Fh2DDOoABysmBwONTesurjlRnTpZl52XNwopa/vAEn78B0VRLIi', 'manager', 'CA', '2026-03-10 14:29:56.636875+00'),
	('95c397f5-3a67-4fc7-bb82-abb628223778', 'carol-viewer-GB', '$2b$10$23Fh2DDOoABysmBwONTesurjlRnTpZl52XNwopa/vAEn78B0VRLIi', 'viewer', 'GB', '2026-03-10 14:29:56.636875+00'),
	('1d03cb90-fbbc-46e3-a873-7901cf3856f9', 'dave-admin-GB', '$2b$10$23Fh2DDOoABysmBwONTesurjlRnTpZl52XNwopa/vAEn78B0VRLIi', 'admin', 'GB', '2026-03-10 14:29:56.636875+00'),
	('a117911a-5c67-46de-81b6-8e09b0f5a893', 'eve-manager-US', '$2b$10$23Fh2DDOoABysmBwONTesurjlRnTpZl52XNwopa/vAEn78B0VRLIi', 'manager', 'US', '2026-03-10 14:29:56.636875+00'),
	('fd0f34d5-e8ee-4cb1-b82a-26631fdcd6df', 'frank-viewer-CA', '$2b$10$23Fh2DDOoABysmBwONTesurjlRnTpZl52XNwopa/vAEn78B0VRLIi', 'viewer', 'CA', '2026-03-10 14:29:56.636875+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."features_id_seq"', 11, true);


--
-- Name: overrides_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."overrides_id_seq"', 18, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict 9JRPBa8zKndI3nc2sQvKiJW1wWOUGUE30fltUn0peAPVHs3sI2xJoYbVSvyN5El

RESET ALL;
