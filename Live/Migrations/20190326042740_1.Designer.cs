﻿// <auto-generated />
using Live.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Live.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20190326042740_1")]
    partial class _1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Live.Data.Entity.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Password");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Live.Data.Entity.UserStream", b =>
                {
                    b.Property<int>("UserStreamId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Key");

                    b.Property<int>("UserId");

                    b.Property<int>("Views");

                    b.HasKey("UserStreamId");

                    b.HasIndex("UserId");

                    b.ToTable("Streams");
                });

            modelBuilder.Entity("Live.Data.Entity.UserStream", b =>
                {
                    b.HasOne("Live.Data.Entity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
