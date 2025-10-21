import {createClient} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
console.log(createClient);

const SUPABASE_URL ="https://xvkaogsogujaypobdhqb.supabase.co";
const SUPABASE_ANNON_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a2FvZ3NvZ3VqYXlwb2JkaHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MzQ1OTEsImV4cCI6MjA3NjMxMDU5MX0.Ly5ivveif0bpGdpPhnASLP9JArsqdrehHmEHVSkUnAM";

const SUPABASE = createClient(SUPABASE_URL , SUPABASE_ANNON_KEY)


export default SUPABASE