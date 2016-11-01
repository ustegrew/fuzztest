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

import fuzztest.generator.VBrowseable;

/**
 * @author peter
 *
 */
public class TClass
{
    public static TClass Create (VBrowseable obj)
    {
        jsweet.lang.Object          obj0;
        TClass                      ret;
        
        obj0 = (jsweet.lang.Object) ((Object) obj);
        ret  = new TClass (obj0);
        
        return ret;
    }
    
    private TInheritChain       fInherits;
    private String              fName;
    
    TClass (jsweet.lang.Object obj)
    {
        _Init (obj);
    }
    
    public String GetName ()
    {
        return fName;
    }
    
    public TClass GetParent ()
    {
        int     nLinks;
        TClass  ret;
        
        nLinks = fInherits.GetNumLinks ();
        ret    = null;
        if (nLinks >= 1)
        {
            ret = fInherits.GetLink (0);
        }
        
        return ret;
    }
    
    public boolean IsEqualTo (TClass other)
    {
        boolean ret;
        
        ret = _IsEqualTo (other);
        
        return ret;
    }
    
    public boolean IsEqualToOrDerivedFrom (TClass other)
    {
        boolean     isEq;
        boolean     isDer;
        boolean     ret;
        
        isEq    = _IsEqualTo (other);
        isDer   = fInherits.IsLink (other);
        ret     = isEq  ||  isDer;
        
        return ret;
    }

    private boolean _IsEqualTo (TClass other)
    {
        String          path0;
        String          path1;
        boolean         ret;
        
        path0   = _GetCanonicalName ();
        path1   = other._GetCanonicalName ();
        ret     = path0.equals (path1);
        
        return ret;
    }
    
    /**
     * @return
     */
    private String _GetCanonicalName ()
    {
        int         n;
        String      ret;
        
        n = fInherits.GetNumLinks ();
        if (n >= 1)
        {
            ret     = fInherits.GetAsString ();
            ret    += TInheritChain.kPathSeparator;
            ret    += fName;
        }
        else
        {
            ret = fName;
        }
        
        return ret;
    }
    
    private void _Init (jsweet.lang.Object obj)
    {
        jsweet.lang.Object          p;
        jsweet.lang.Object          c;

        p           = (jsweet.lang.Object) obj.$get ("__proto__");
        c           = (jsweet.lang.Object) p.$get ("constructor");
        fName       = (String) c.$get ("name");
        fInherits   = new TInheritChain (obj);
    }
}
