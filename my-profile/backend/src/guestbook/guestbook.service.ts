import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    // Use service role if present; else fall back to anon
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY!,
  );

  async list() {
    const { data, error } = await this.supabase
      .from('guestbook_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async create(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook_posts')
      .insert([{ name, message }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook_posts')
      .update({ name, message })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase
      .from('guestbook_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { ok: true };
  }
}