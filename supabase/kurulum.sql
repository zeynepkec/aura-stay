-- =============================================================
--  AURA Stay — Supabase kurulumu (bir kez çalıştırılır)
--  Supabase → SQL Editor → New query → bu dosyanın tamamını yapıştır → Run
-- =============================================================

-- Tüm paylaşılan kayıtlar tek tabloda: siparişler, talepler, geri bildirimler,
-- değerlendirmeler, menü durumu ve kapatılan hesaplar.
create table if not exists public.records (
  collection text not null,              -- ör. 'aura-orders'
  id text not null,                      -- kaydın numarası, ör. 'A1234'
  data jsonb not null,                   -- kaydın kendisi
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);

-- Uygulamanın bu tabloya erişebilmesi
grant select, insert, update, delete on public.records to anon, authenticated;

-- Satır güvenliği (RLS): şimdilik demo için herkes okuyup yazabilir.
-- Bir sonraki adımda misafir ve personel yetkilerini ayıracağız.
alter table public.records enable row level security;

drop policy if exists "demo okuma" on public.records;
drop policy if exists "demo ekleme" on public.records;
drop policy if exists "demo guncelleme" on public.records;
drop policy if exists "demo silme" on public.records;

create policy "demo okuma" on public.records for select using (true);
create policy "demo ekleme" on public.records for insert with check (true);
create policy "demo guncelleme" on public.records for update using (true) with check (true);
create policy "demo silme" on public.records for delete using (true);

-- Canlı güncelleme: bir cihaz değişiklik yapınca diğerleri anında haber alsın
do $$
begin
  if not exists (
    select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'records'
  ) then
    alter publication supabase_realtime add table public.records;
  end if;
end $$;
