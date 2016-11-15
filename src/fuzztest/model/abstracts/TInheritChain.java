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

package fuzztest.model.abstracts;

import fuzztest.utils.storage.TArrayMap;

/**
 * @author peter
 *
 */
public class TInheritChain
{
    public static final String kPathSeparator  = ".";
    
    private TArrayMap<TClass>           fChain;
    
    TInheritChain ()
    {
        fChain = new TArrayMap<> ();
    }
    
    public String GetAsString ()
    {
        String  ret;

        ret = _GetAsString (false);
        
        return ret;
    }
    
    public String GetAsString (boolean isDetailed)
    {
        String  ret;

        ret = _GetAsString (isDetailed);
        
        return ret;
    }
    
    /**
     * Returns the i-th parent in this inheritance chain.
     * 
     * @param   i   The number of generations above. Zero is the the referred class itself, 
     *              1 (one) the first parent generation etc.
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
        boolean isEq;
        boolean ret;

//console.log ("IsLink: " + c.GetCanonicalPath () + " in " + this.GetAsString ());
        ret = false;
        n   = fChain.GetNumElements ();
        cID = c.GetCanonicalPath ();
        if (n >= 1)
        {
            for (i = 0; i < n; i++)
            {
                c0      = fChain.Get (i);
                cID0    = c0.GetCanonicalPath ();
                isEq    = cID.equals (cID0);
//console.log ("    Test: " + cID + " == " + cID0 + ": " + isEq);
                ret     = ret || isEq;
            }
        }
//console.log  ("    IsDerived: " + ret);                  
        
        return ret;
    }
    
    void Add (TClass c)
    {
        String      key;
        
        key = c.GetName ();
        fChain.Add (key, c);
    }
    
    private String _GetAsString (boolean isDetailed)
    {
        int     i;
        int     n;
        TClass  c;
        String  pSep;
        String  ret;
        
        pSep    = isDetailed  ?  "\n" : kPathSeparator;
        ret     = "";
        n       = fChain.GetNumElements ();
        if (n >= 1)
        {
            for (i = n-1; i >= 0; i--)
            {
                c       = fChain.Get (i);
                ret    += isDetailed  ?  c.GetCanonicalPath () : c.GetName ();
                if (i > 0)
                {
                    ret += pSep;
                }
            }
        }
        
        return ret;
    }
}
