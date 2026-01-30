import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = "https://wxnradqtzkqzsxtuufbj.supabase.co";
const supabaseKey = "sb_publishable_mdMFjfXu8QXyzVKZ4QXv2w_tnf_7mmn";


const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      storage: AsyncStorage, // يستخدم AsyncStorage لحفظ الجلسة
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // مهم للـ React Native
    },
  }
);

export default supabase;