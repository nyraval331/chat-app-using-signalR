using FuseChatify.Data;
using FuseChatify.Data.POCO;
using FuseChatify.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Microsoft.AspNetCore.SignalR.Transports;

namespace FuseChatify.Hubs
{
    public class ChatHubs : Hub
    {
        public ApplicationDbContext _context = null;
        public UserManager<IdentityUser> _userManager = null;
        public ChatHubs(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task SendMessage(MessageDTO message)
        {
            List<string> userIds = new List<string>() { message.ToUserId, message.FromUserId };
            await Clients.Users(userIds).SendAsync("MessageRecieve", message);
        }

        public async Task UserTypingStart(string fromUserId, string toUserId)
        {
            await Clients.User(toUserId).SendAsync("UserTypingInProgress", fromUserId);
        }

        public async Task UserTypingStop(string fromUserId, string toUserId)
        {
            await Clients.User(toUserId).SendAsync("UserTypingStopped", fromUserId);
        }

        public async Task CheckUserConnectedStatus(string fromUserId)
        {
            var userConnectionList = _context.UserConnections.Select(x => new
            {
                UserId = x.UserId,
                IsConnected = x.Connected
            }).ToList();
            var currentUserFriends = _context.UserFriendLists.Where(x => x.FromUserId == fromUserId).Select(x => x.ToUserId).ToList();
            await Clients.Users(currentUserFriends).SendAsync("UpdateUserConnectedStatus", userConnectionList);
        }

        public override Task OnConnectedAsync()
        {
            var userId = _userManager.GetUserId(Context.User);
            var isConnectionExist = _context.UserConnections.FirstOrDefault(x => x.UserId == userId);
            if (isConnectionExist == null)
            {
                isConnectionExist = new UserConnections
                {
                    UserId = userId,
                    ConnectionID = Context.ConnectionId,
                    Connected = true
                };
                _context.UserConnections.Add(isConnectionExist);
            }
            else
            {
                isConnectionExist.ConnectionID = Context.ConnectionId;
                isConnectionExist.Connected = true;
            }
            _context.SaveChanges();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var userId = _userManager.GetUserId(Context.User);
            var isConnectionExist = _context.UserConnections.FirstOrDefault(x => x.UserId == userId);
            if (isConnectionExist == null)
            {
                isConnectionExist = new UserConnections
                {
                    UserId = userId,
                    ConnectionID = Context.ConnectionId,
                    Connected = false
                };
                _context.UserConnections.Add(isConnectionExist);
            }
            else
            {
                isConnectionExist.ConnectionID = Context.ConnectionId;
                isConnectionExist.Connected = false;
            }
            _context.SaveChanges();
            return base.OnDisconnectedAsync(exception);
        }

        protected override void Dispose(bool isDispose)
        {
            if (isDispose)
            {
                if (_context != null)
                {
                    _context.Dispose();
                    _context = null;
                }
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }
            }

            base.Dispose(isDispose);
        }
    }
}
