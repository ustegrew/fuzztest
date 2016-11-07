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

import static jsweet.dom.Globals.console;

import fuzztest.generator.VBrowseable;

/**
 * @author peter
 *
 */
public class TClass
{
    public static final String          kNullID = "anonymous";
    
    public static TClass Create (VBrowseable obj)
    {
        jsweet.lang.Object          obj0;
        TClass                      ret;
        
        obj0 = (jsweet.lang.Object) ((Object) obj);
        ret  = new TClass (obj0);
        
        return ret;
    }
    
    private String              fCanonicalPath;
    private String              fInheritPath;
    private TInheritChain       fInherits;
    private String              fName;
    
    private TClass (jsweet.lang.Object obj)
    {
        jsweet.lang.Object          proto;
        jsweet.lang.Object          constr;
        TClass                      cls;
        String                      cPath;

        fCanonicalPath      = kNullID; 
        fName               = kNullID;
        fInheritPath        = kNullID;
        fInherits           = new TInheritChain ();
        proto               = null;
        
        if (obj != null)
        {
            proto = (jsweet.lang.Object) obj.$get ("__proto__");
            if (proto != null)
            {
                constr  = (jsweet.lang.Object) proto.$get ("constructor");
                if (constr != null)
                {
                    fName = (String) constr.$get ("name");
                    fInherits.Add (this);

                    while (proto != null)
                    {
                        cls   = new TClass (proto);
                        proto = (jsweet.lang.Object) proto.$get ("__proto__");
                        if (proto != null)
                        {
                            fInherits.Add (cls);
                        }
                    }
                    
                    fInheritPath = fInherits.GetAsString ();
                }
            }
        }
        
        proto = (jsweet.lang.Object) jsweet.lang.Object.getPrototypeOf (obj);
        if (proto != null)
        {
            constr = (jsweet.lang.Object) proto.$get ("constructor");
            if (constr != null)
            {
                cPath = (String) constr.$get ("__classname");
                if (cPath != null)
                {
                    fCanonicalPath = cPath;
                }
            }
        }
    }
    
    public String GetAsString ()
    {
        String ret;
        
        ret = fCanonicalPath + "(" + fInheritPath + ")";
        
        return ret;
    }
    
    public String GetCanonicalPath ()
    {
        return fCanonicalPath;
    }
    
    public String GetInheritPath ()
    {
        return fInheritPath;
    }
    
    public String GetInheritPath (boolean isDetailed)
    {
        String ret;
        
        ret = fInherits.GetAsString (isDetailed);
        
        return ret;
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
        if (nLinks >= 2)
        {
            ret = fInherits.GetLink (1);
        }
        
        return ret;
    }
    
    public boolean IsEqualTo (TClass other)
    {
        boolean ret;

//console.log  ("Testing strict equality: " + this.GetAsString () + " / " + other.GetAsString ());                  
        ret = _IsEqualTo (other);
        
        return ret;
    }
    
    public boolean IsEqualToOrDerivedFrom (TClass other)
    {
        boolean     isEq;
        boolean     isDer;
        boolean     ret;
        
//console.log  ("Testing loose equality: " + this.GetAsString () + " / " + other.GetAsString ());                  
        isEq    = _IsEqualTo (other);
        isDer   = other.fInherits.IsLink (this);
        ret     = isEq  ||  isDer;
        
        return ret;
    }

    private boolean _IsEqualTo (TClass other)
    {
        boolean         ret;
        
        ret = fCanonicalPath.equals (other.fCanonicalPath);
//console.log ("_IsEqualTo: " + ret);

        return ret;
    }
}
