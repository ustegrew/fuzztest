/* -----------------------------------------------------------------------------
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
----------------------------------------------------------------------------- */

package fuzztest.generator.classing;

import fuzztest.utils.store.TArrayMap;

/**
 * @author peter
 *
 */
public class TInheritChain
{
    public static final String kPathSeparator  = ".";
    
    private TArrayMap<TClass>           fChain;
    
    public TInheritChain (jsweet.lang.Object obj)
    {
        fChain = new TArrayMap<> ();
        _Build (obj);
    }
    
    public String GetAsString ()
    {
        int     i;
        int     n;
        TClass  c;
        String  ret;
        
        ret = "";
        n   = fChain.GetNumElements ();
        if (n >= 1)
        {
            for (i = 0; i < n; i++)
            {
                c       = fChain.Get (i);
                ret    += c.GetName ();
                if (i < n-1)
                {
                    ret += kPathSeparator;
                }
            }
        }
        
        return ret;
    }
    
    /**
     * Returns the i-th parent in this inheritance chain.
     * 
     * @param   i   The number of generations above. Zero is the first parent generation, 1 the one above etc.
     * @return      The parent class that it i generations above the class hosting this chain.
     */
    public TClass GetLink (int i)
    {
        TClass ret;
        
        ret = fChain.Get (i);

        return ret;
    }
    
    public int GetNumLinks ()
    {
        int ret;
        
        ret = fChain.GetNumElements ();
        
        return ret;
    }
    
    public boolean IsLink (TClass c)
    {
        int     i;
        int     n;
        TClass  c0;
        String  cID;
        String  cID0;
        boolean ret;
        
        ret = false;
        n   = fChain.GetNumElements ();
        if (n >= 1)
        {
            for (i = 0; i < n; i++)
            {
                c0      = fChain.Get (i);
                cID     = c.GetName ();
                cID0    = c0.GetName ();
                ret     = ret || cID.equals (cID0);
            }
        }
        
        return ret;
    }

    private void _Build (jsweet.lang.Object obj)
    {
        TClass                      cls;
        jsweet.lang.Object          instance;
        String                      key;
        
        instance    = obj;
        while (instance != null)
        {
            instance    = (jsweet.lang.Object) instance.$get ("__proto__");
            cls         = new TClass (instance);
            key         = cls.GetName ();
            fChain.Add (key, cls);
        }
    }
}
