import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config"
import { SupabaseClient, createClient } from "@supabase/supabase-js"
@Injectable()
export class SupabaseService {
    private readonly supabase: SupabaseClient;
    private readonly key: string;
    private readonly url: string
    constructor(private readonly configService: ConfigService) {
        this.key = this.configService.get("SUPABASE_KEY")
        this.url = this.configService.get("SUPABASE_URL")
        this.supabase = createClient(this.url, this.key)
    }
    getClient(): SupabaseClient {
        return this.supabase
    }
}