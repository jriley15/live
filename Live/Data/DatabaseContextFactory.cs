using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Live.Data
{
    public interface IDatabaseContextFactory
    {

        DatabaseContext Create();

    }

    public class DatabaseContextFactory : IDatabaseContextFactory
    {
        private readonly DbContextOptions<DatabaseContext> options;

        public DatabaseContextFactory(DbContextOptions<DatabaseContext> options)
        {
            this.options = options;
        }

        public DatabaseContext Create()
        {
            return new DatabaseContext(options);
        }
    }
}
