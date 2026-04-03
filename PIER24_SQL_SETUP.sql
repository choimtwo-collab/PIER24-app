-- PIER24 Supabase 초기 설정 스크립트
-- 이 스크립트는 bmsdpwfnuguadiuuxwxr 프로젝트의 SQL Editor에서 실행해야 합니다.

-- 1. 기존 테이블 삭제 (필요한 경우)
DROP TABLE IF EXISTS running_records;
DROP TABLE IF EXISTS marathon_records;
DROP TABLE IF EXISTS members;

-- 2. members 테이블 생성
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    department TEXT,
    mileage2025 FLOAT DEFAULT 0,
    current_mileage FLOAT DEFAULT 0,
    coins INTEGER DEFAULT 0,
    inventory TEXT[] DEFAULT ARRAY['char_egg'],
    equipped JSONB DEFAULT '{"character": "char_egg", "head": null, "body": null, "pants": null, "shoes": null}',
    badges TEXT[] DEFAULT ARRAY[]::TEXT[],
    training_attendance BOOLEAN[] DEFAULT ARRAY[false, false, false, false, false, false, false, false]
);

-- 3. members 테이블 RLS 해제 (개발 편의를 위해)
ALTER TABLE members DISABLE ROW LEVEL SECURITY;

-- 4. 초기 사용자 데이터 삽입
INSERT INTO members (id, name, department, mileage2025, current_mileage, coins, inventory, equipped, badges)
VALUES 
  ('86645223-a009-4559-a495-e25fcce9bf31', '김동국', '전략기획팀', 1200, 150.5, 5200, ARRAY['char_egg', 'item_shoes_rocket'], '{"character": "char_egg", "head": null, "body": null, "pants": null, "shoes": "item_shoes_rocket"}', ARRAY[]::TEXT[]),
  ('86645223-a009-4559-a495-e25fcce9bf32', '이지혜', '마케팅팀', 850, 45.2, 1200, ARRAY['char_egg'], '{"character": "char_egg", "head": null, "body": null, "pants": null, "shoes": null}', ARRAY[]::TEXT[]),
  ('86645223-a009-4559-a495-e25fcce9bf33', '박철수', 'IT운영팀', 2100, 320.0, 8900, ARRAY['char_egg', 'head_goggles'], '{"character": "char_egg", "head": "head_goggles", "body": null, "pants": null, "shoes": null}', ARRAY[]::TEXT[]),
  ('86645223-a009-4559-a495-e25fcce9bf34', '최은정', '인사부', 420, 12.0, 500, ARRAY['char_egg'], '{"character": "char_egg", "head": null, "body": null, "pants": null, "shoes": null}', ARRAY[]::TEXT[]),
  ('bd770dce-f3ac-4ee5-9055-13e498d586aa', '조현선', 'PI실', 500, 0, 0, ARRAY['char_egg'], '{"character": "char_egg", "head": null, "body": null, "pants": null, "shoes": null}', ARRAY[]::TEXT[])
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name,
  department = EXCLUDED.department,
  mileage2025 = EXCLUDED.mileage2025,
  current_mileage = EXCLUDED.current_mileage,
  coins = EXCLUDED.coins,
  inventory = EXCLUDED.inventory,
  equipped = EXCLUDED.equipped,
  badges = EXCLUDED.badges;

-- 5. running_records 테이블 생성
CREATE TABLE IF NOT EXISTS running_records (
    id BIGSERIAL PRIMARY KEY,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    distance FLOAT NOT NULL,
    duration INTEGER, -- seconds
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    location TEXT,
    memo TEXT,
    type TEXT,
    period TEXT
);

-- 6. running_records 테이블 RLS 해제
ALTER TABLE running_records DISABLE ROW LEVEL SECURITY;

-- 7. marathon_records 테이블 생성
CREATE TABLE IF NOT EXISTS marathon_records (
    id BIGSERIAL PRIMARY KEY,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    date DATE,
    course TEXT,
    record TEXT,
    status TEXT DEFAULT 'completed'
);

-- 8. marathon_records 테이블 RLS 해제
ALTER TABLE marathon_records DISABLE ROW LEVEL SECURITY;

-- 9. training_records 테이블 생성
CREATE TABLE IF NOT EXISTS training_records (
    id BIGSERIAL PRIMARY KEY,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    location TEXT,
    content TEXT
);

-- 10. training_records 테이블 RLS 해제
ALTER TABLE training_records DISABLE ROW LEVEL SECURITY;
