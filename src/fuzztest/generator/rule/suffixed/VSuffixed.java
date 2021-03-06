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

package fuzztest.generator.rule.suffixed;

import fuzztest.generator.rule._common.ERuleAdhesion;
import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNode;
import fuzztest.generator.rule._common.VNodeProcessor;
import fuzztest.model.abstracts.TClass;
import fuzztest.utils.gen.TGenData;

/**
 * @author peter
 *
 */
public abstract class VSuffixed extends VNodeProcessor
{
    /**
     * A dummy class to provide a concrete derivative from the hosting abstract class.
     * Purely needed so we have something to instantiate (TClass cTor needs an object). 
     */
    private static class VSuffixedT extends VSuffixed 
    {
        protected VSuffixedT () {super (false, false, TAttributeSet.GetNullSet ());}
    }
    /**
     * The {@link TClass} of this class for type information. 
     */
    public  static final TClass gkClass = (new VSuffixedT()).GetClass ().GetParent ();

    private boolean     fIsNMinZero;
    private boolean     fIsNMaxInfinite;
    
    /**
     * cTor. Creates a new suffixed expression. One of x? (optional), x+ (one-or-more), x* (zero-or-more).
     * The two parameters reflect the actual behavior of the created object:
     * 
     * <code>isNMinZero</code>: <code>true</code>, <code>isNMaxInfinite</code>:  <code>false</code>: <code>x?</code>
     * <code>isNMinZero</code>: <code>false</code>, <code>isNMaxInfinite</code>: <code>true</code>:  <code>x+</code>
     * <code>isNMinZero</code>: <code>true</code>, <code>isNMaxInfinite</code>:  <code>true</code>:  <code>x*</code>
     * 
     * @param isNMinZero            Allow minimum of zero characters?
     * @param isNMaxInfinite        Allow for infinite number of characters?
     */
    protected VSuffixed (boolean isNMinZero, boolean isNMaxInfinite, TAttributeSet attributes)
    {
        super (attributes);
        fIsNMinZero     = isNMinZero;
        fIsNMaxInfinite = isNMaxInfinite;
    }

    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#_CreateData(fuzztest.generator.rule.TStrategy, java.lang.String)
     */
    @Override
    protected String _CreateData (String head)
    {
        TAttributeSet   as;
        ERuleAdhesion   r;
        VNode           ex;
        boolean         doBreakRule;
        int             nMin;
        int             nMax;
        int             n;
        int             i;
        String          ret;
        
        as          = _GetAttributes ();
        doBreakRule = true;
        r           = as.GetRuleAdhesion ();
        if (r == ERuleAdhesion.kFollowRule)
        {
            doBreakRule = false;
        }
        else
        {
            doBreakRule = TGenData.GetBoolean ();
        }

        n = 0;
        if (doBreakRule)
        {   /* [100] */
            nMin = 0;
            nMax = 0;
            if      (fIsNMinZero    && !fIsNMaxInfinite)
            {
                nMax = 1;
            }
            else if (!fIsNMinZero   && fIsNMaxInfinite)
            {
                nMax = 0;
            }
            else if (fIsNMinZero    && fIsNMaxInfinite)
            {
                nMax = as.GetNumRepeatsMax ();
            }
            
            if (nMax >= 1)
            {
                n = TGenData.GetIntBetween (nMin, nMax);
            }
        }
        else
        {
            nMin = fIsNMinZero          ?  0                     : 1;
            nMax = fIsNMaxInfinite      ?  as.GetNumRepeatsMax () : 1;
            n    = TGenData.GetIntBetween (nMin, nMax);
        }
        
        ret = head;
        if (n >= 1)
        {
            ex = _GetExpression ();
            for (i = 1; i <= n; i++)
            {
                ret = ret + ex.CreateData ("");
            }
        }

        return ret;
    }
}

/*
[100]: We always assume this case to be kInjectInvalids. Rule mapping if creating invalid string:
       Rule                     fIsNMinZero   fIsNMaxInfinite  nMin   nMax                   comment
       optional (zero or one)   true          false            0      1                      remains unchanged
       one or more:             false         true             0      0                      break rule
       zero or more:            true          true             0      s.GetNumRepeatsMax ()  remains unchanged
       
*/