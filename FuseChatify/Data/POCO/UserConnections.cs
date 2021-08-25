using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FuseChatify.Data.POCO
{
    public class UserConnections
    {
        [Key]
        public int UserConnectionId { get; set; }
        public string UserId { get; set; }
        public string ConnectionID { get; set; }
        public bool Connected { get; set; }
    }
}
