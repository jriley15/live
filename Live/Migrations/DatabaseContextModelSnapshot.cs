﻿// <auto-generated />
using System;
using Live.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Live.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Live.Data.Entity.ChatMessage", b =>
                {
                    b.Property<int>("ChatMessageId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ChatRoomId");

                    b.Property<string>("Message");

                    b.Property<int>("UserId");

                    b.HasKey("ChatMessageId");

                    b.HasIndex("ChatRoomId");

                    b.HasIndex("UserId");

                    b.ToTable("ChatMessages");
                });

            modelBuilder.Entity("Live.Data.Entity.ChatRoom", b =>
                {
                    b.Property<int>("ChatRoomId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("StreamId");

                    b.HasKey("ChatRoomId");

                    b.HasIndex("StreamId")
                        .IsUnique();

                    b.ToTable("ChatRooms");
                });

            modelBuilder.Entity("Live.Data.Entity.Stream", b =>
                {
                    b.Property<int>("StreamId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Key");

                    b.Property<string>("Status");

                    b.Property<bool>("Streaming");

                    b.Property<string>("Title");

                    b.Property<int>("UserId");

                    b.Property<int>("Viewers");

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

                    b.Property<int?>("ChatRoomId");

                    b.Property<string>("Email");

                    b.Property<string>("Password");

                    b.Property<string>("Username");

                    b.HasKey("UserId");

                    b.HasIndex("ChatRoomId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Live.Data.Entity.ChatMessage", b =>
                {
                    b.HasOne("Live.Data.Entity.ChatRoom", "ChatRoom")
                        .WithMany("Messages")
                        .HasForeignKey("ChatRoomId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Live.Data.Entity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Live.Data.Entity.ChatRoom", b =>
                {
                    b.HasOne("Live.Data.Entity.Stream", "Stream")
                        .WithOne("ChatRoom")
                        .HasForeignKey("Live.Data.Entity.ChatRoom", "StreamId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Live.Data.Entity.Stream", b =>
                {
                    b.HasOne("Live.Data.Entity.User", "User")
                        .WithOne("Stream")
                        .HasForeignKey("Live.Data.Entity.Stream", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Live.Data.Entity.User", b =>
                {
                    b.HasOne("Live.Data.Entity.ChatRoom")
                        .WithMany("Users")
                        .HasForeignKey("ChatRoomId");
                });
#pragma warning restore 612, 618
        }
    }
}
