 
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        ALGO_API_ID:string;
        ALOG_SEARCH_ONLY_KEY:string;
        DATABASE_URL: string;
        JWT_SECRET : string;
       }
    }
  }
  
  
  export { }