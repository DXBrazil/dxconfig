﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using DXConfig.Server.Models;
using DXConfig.Server.Services;

namespace DXConfig.Server.Managers
{
    public class UserManager
    {
        private IPassKeyServices _passKeyServices;

        public UserManager(IPassKeyServices passKeyServices)
        {
            this._passKeyServices = passKeyServices;
        }

        public User Create(string provider, string username)
        {
            string userString = $"{provider}:{username}";

            var hashKey = _passKeyServices.Create(userString);
            
            return new User(provider, username, hashKey);
        }
        
        public bool Validate(User user)
        {
            return _passKeyServices.ValidateKey(user.Key);
        }

        public User ImportUser(string text)
        {
            if (text == null)
                return null;

            string[] components = text.Split(":");

            if (components.Length != 3)
                return null;

            string provider = WebUtility.UrlDecode(components[0]);
            string name = WebUtility.UrlDecode(components[1]);

            return Create(provider, name);
        }

        public string ExportUser(User user)
        {
            string provider = WebUtility.UrlEncode(user.Provider);
            string name = WebUtility.UrlEncode(user.Name);
            string hash = user.Key.Hash;

            return $"{provider}:{name}:{hash}";
        }
    }

}
