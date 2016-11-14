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

package fuzztest.generator.rule._common;

import fuzztest.model.abstracts.TClass;

/**
 * @author peter
 *
 */
public abstract class VNodeProcessor extends VNode
{
    private static class VNodeProcessorT extends VNodeProcessor
    {
        protected VNodeProcessorT () {super (TAttributeSet.GetNullSet ());}
        protected String _CreateData (String head) {return null;}
    }
    public static final TClass gkClass = new VNodeProcessorT ().GetClass ().GetParent ();
    
    /**
     * @param s
     */
    protected VNodeProcessor (TAttributeSet attributes)
    {
        super (attributes);
    }
}
