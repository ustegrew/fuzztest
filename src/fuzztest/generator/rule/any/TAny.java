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

package fuzztest.generator.rule.any;

import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNodeProcessor;
import fuzztest.model.abstracts.TClass;
import fuzztest.utils.gen.TGenData;

/**
 * Generator rule for: Any character. 
 *
 * Corresponding PEGjs rule:
 * 
 * <pre>
 * AnyMatcher
 *     = "." 
 *     {
 *         return
 *         {
 *             type:               "any",
 *             location:           location() 
 *         }; 
 *     }
 * </pre>
 * 
 * @author peter
 */
public class TAny extends VNodeProcessor
{
    /**
     * The {@link TClass} of this class for type information. 
     */
    public static final TClass gkClass = (new TAny (TAttributeSet.GetNullSet ())).GetClass ();

    /**
     * @param attributes
     */
    protected TAny (TAttributeSet attributes)
    {
        super (attributes);
    };
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.VNode#_CreateData(fuzztest.generator.rule.TStrategy, java.lang.String)
     */
    @Override
    protected String _CreateData (String head)
    {
        String          ret;
        
        /* [100] */
        ret = head + TGenData.GetChar ();
        
        return ret;
    }
}

/*
[100]   We just ignore the strategy and always return a character from the entire unicode range.
 */
