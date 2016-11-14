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

package fuzztest._dev_concepts.objects.repo.del;

import static jsweet.dom.Globals.console;
import static jsweet.util.Globals.typeof;

import fuzztest.generator.TRepository;
import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNode;

/**
 * @author peter
 *
 */
public class TDevRepoDel_01
{
    public static void TRepoDelTest_01 ()
    {
        VNodeType           n1;
        
        n1 = new VNodeType ();
        TRepository.Clear ();
        /* Will TRepository.Clear also undefine n1? TRepository uses THashMap 
         * which does a delete operation when clearing...*/

        console.log ();
        console.log ("=========================================================");
        console.log ("TDevRepoDel_01::TRepoDelTest_01");
        console.log ("=========================================================");
        console.log (typeof (n1));
        /* Output is: "object", i.e. even though we delete the object in the repository
         * it's preserved in variable n1 in this method until the method goes out of scope.
         * This is the behaviour we intended. */
    }
    private static class VNodeType extends VNode 
    {
        protected VNodeType () {super (TAttributeSet.GetNullSet ());}
        protected String _CreateData (String head) {return null;}
    }
}
