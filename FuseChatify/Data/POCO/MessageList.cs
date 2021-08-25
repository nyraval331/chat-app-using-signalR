using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FuseChatify.Data.POCO
{
    public class MessageList
    {
        [Key]
        public int MessageId { get; set; }
        public string FromUserId { get; set; }
        public string ToUserId { get; set; }
        public DateTime MessageTime { get; set; }
        public string MessageText { get; set; }
        public MessageList()
        {
            MessageTime = DateTime.Now;
        }
    }
}
