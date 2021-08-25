using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FuseChatify.Data;
using FuseChatify.Data.POCO;
using FuseChatify.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FuseChatify.Controllers
{
    public class ChatifyController : BaseController
    {
        public readonly ApplicationDbContext _context = null;
        public readonly UserManager<IdentityUser> _userManager;
        public ChatifyController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public IActionResult Index()
        {
            return View();
        }

        public string GetCurrentUserId()
        {
            return _userManager.GetUserId(User);
        }

        [HttpGet]
        public JsonResult BindContactList()
        {
            try
            {
                var contactList = _context.Users.Where(x => x.Id != GetCurrentUserId()).Select(x => new
                {
                    UserId = x.Id,
                    UserName = x.UserName,
                    Email = x.Email
                }).ToList();
                return Json(new { isSuccess = true, contactList = JsonConvert.SerializeObject(contactList) });
            }
            catch (Exception ex)
            {
                return Json(new { isSuccess = false, errorMessage = ex.Message });
            }
        }

        [HttpGet]
        public JsonResult GetUserFriendList()
        {
            try
            {
                var userFriends = _context.UserFriendLists.Where(x => x.FromUserId == GetCurrentUserId()).ToList();
                List<FriendListDTO> friendListDTO = new List<FriendListDTO>();
                foreach (var item in userFriends)
                {
                    var isUserExist = _context.Users.FirstOrDefault(x => x.Id == item.ToUserId);
                    if (isUserExist != null)
                    {
                        friendListDTO.Add(new FriendListDTO()
                        {
                            UserId = item.ToUserId,
                            UserName = isUserExist.UserName,
                            Email = isUserExist.Email
                        });
                    }
                }
                return Json(new { isSuccess = true, friendList = JsonConvert.SerializeObject(friendListDTO) });
            }
            catch (Exception ex)
            {
                return Json(new { isSuccess = false, errorMessage = ex.Message });
            }
        }

        [HttpGet]
        public JsonResult AddUserToFriendList(string toUserId)
        {
            try
            {
                var isUserAlreadyFriend = _context.UserFriendLists.FirstOrDefault(x => x.FromUserId == GetCurrentUserId() && x.ToUserId == toUserId);
                if (isUserAlreadyFriend == null)
                {
                    isUserAlreadyFriend = new UserFriendList()
                    {
                        FromUserId = GetCurrentUserId(),
                        ToUserId = toUserId
                    };
                    _context.UserFriendLists.Add(isUserAlreadyFriend);
                    _context.SaveChanges();
                    return Json(new { isSuccess = true });
                }
                return Json(new { isSuccess = false, alreadyFriend = true });
            }
            catch (Exception ex)
            {
                return Json(new { isSuccess = false, errorMessage = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult AddMessageFromUser(MessageDTO messageDTO)
        {
            try
            {
                if (!string.IsNullOrEmpty(messageDTO.MessageText) && !string.IsNullOrEmpty(messageDTO.ToUserId))
                {
                    MessageList messageList = new MessageList
                    {
                        FromUserId = GetCurrentUserId(),
                        ToUserId = messageDTO.ToUserId,
                        MessageText = messageDTO.MessageText
                    };
                    _context.MessageLists.Add(messageList);
                    _context.SaveChanges();
                }
                return Json(new { isSuccess = true });
            }
            catch (Exception ex)
            {
                return Json(new { isSuccess = false, errorMessage = ex.Message });
            }
        }

        [HttpGet]
        public JsonResult GetMessageListByUser(string toUserId)
        {
            try
            {
                var fromUserId = GetCurrentUserId();
                var messageList = _context.MessageLists.Where(x => (x.FromUserId == fromUserId && x.ToUserId == toUserId) || (x.FromUserId == toUserId && x.ToUserId == fromUserId)).ToList();
                return Json(new { isSuccess = true, messageList = JsonConvert.SerializeObject(messageList) });
            }
            catch (Exception ex)
            {
                return Json(new { isSuccess = false, errorMessage = ex.Message });
            }
        }
    }
}