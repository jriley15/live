using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Live.Data.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Live.Data
{
    public class DatabaseContext : DbContext
    {

        public DbSet<User> Users { get; set; }

        public DbSet<Stream> Streams { get; set; }

        public DbSet<ChatRoom> ChatRooms { get; set; }

        public DbSet<ChatMessage> ChatMessages { get; set; }


        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        { }


    }
}
