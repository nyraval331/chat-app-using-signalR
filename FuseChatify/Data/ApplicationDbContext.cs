using System;
using System.Collections.Generic;
using System.Text;
using FuseChatify.Data.POCO;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FuseChatify.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<UserFriendList> UserFriendLists { get; set; }
        public DbSet<MessageList> MessageLists { get; set; }
        public DbSet<UserConnections> UserConnections { get; set; }
    }
}
