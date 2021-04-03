using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace api.Repositories
{
    public class BaseRepository{

        private string ConnectionString =>
            $@"Data Source={Environment.GetEnvironmentVariable("DB_HOST")};
            Initial Catalog={Environment.GetEnvironmentVariable("DB_DATABASE")};
            User Id={Environment.GetEnvironmentVariable("DB_USERNAME")};
            password={Environment.GetEnvironmentVariable("DB_PASSWORD")}";

        protected IEnumerable<T> Query<T>(string sql) => Query<T>(sql, null);

        protected IEnumerable<T> Query<T>(string sql, object param)
        {
            using var conn = new MySqlConnection(ConnectionString);
            return conn.Query<T>(sql, param);
        }
    }
}