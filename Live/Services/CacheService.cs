using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Live.Services
{

    public interface ICacheService
    {
        object GetOrSet(string key, Func<Object> obj);

        void Invalidate(string key);

    }

    public class CacheService : ICacheService
    {

        public Dictionary<string, object> Cache { get; set; } = new Dictionary<string, object>();

        private static readonly object Lock = new object();

        public object GetOrSet(string key, Func<object> getData)
        {
            if (Cache.ContainsKey(key))
            {
                return Cache[key];
            }

            var data = getData();

            lock (Lock)
            {
                if (!Cache.ContainsKey(key))
                {
                    Cache.Add(key, data);
                }
            }

            return data;
        }

        public void Invalidate(string key)
        {
            lock (Lock)
            {
                if (Cache.ContainsKey(key))
                {
                    Cache.Remove(key);
                }
            }
        }
    }
}
