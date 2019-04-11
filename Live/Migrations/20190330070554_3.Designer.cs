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
    [Migration("20190330070554_3")]
    partial class _3
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Live.Data.Entity.Stream", b =>
                {
                    b.Property<int>("StreamId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Key");

                    b.Property<string>("Title");

                    b.Property<int>("UserId");

                    b.Property<int>("Views");

                    b.HasKey("StreamId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Streams");
                });

            modelBuilder.Entity("Live.Data.Entity.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Password");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Live.Data.Entity.Stream", b =>
                {
                    b.HasOne("Live.Data.Entity.User", "User")
                        .WithOne("Stream")
                        .HasForeignKey("Live.Data.Entity.Stream", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}