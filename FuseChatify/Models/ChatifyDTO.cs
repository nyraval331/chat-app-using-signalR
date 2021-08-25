using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FuseChatify.Models
{
    public class FriendListDTO
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }

    public class MessageDTO
    {
        public int MessageId { get; set; }
        public string FromUserId { get; set; }
        public string ToUserId { get; set; }
        public DateTime? MessageTime { get; set; }
        public string MessageText { get; set; }
    }
}
