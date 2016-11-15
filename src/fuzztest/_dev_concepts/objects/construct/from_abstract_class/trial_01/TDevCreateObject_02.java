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

package fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01;

import static jsweet.dom.Globals.console;

import fuzztest.generator.TRepository;
import fuzztest.generator.VBrowseable;
import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNode;
import fuzztest.model.abstracts.TClass;

/**
 * Concept test: Create object from an abstract class. Only works because it's trans-piled into Javascript,
 *               where we (currently) don't have abstract classes. 
 * 
 * @author peter
 * 
 * Output:
 * 
 * 2016-11-15 07:47:53.489 bundle.js:1838 =========================================================
 * 2016-11-15 07:47:53.490 bundle.js:1839 TDevCreateObject_02
 * 2016-11-15 07:47:53.490 bundle.js:1840 =========================================================
 * 2016-11-15 07:47:53.490 bundle.js:1841 Legend: x'  means "a type derived from x" (as in calculus).
 * 2016-11-15 07:47:53.491 bundle.js:1842       : x'^ means "a parent of a type derived from x" (i.e. x).
 * 2016-11-15 07:47:53.491 bundle.js:1845 VBrowseable       => Inheritence chain: Object.VBrowseable
 * 2016-11-15 07:47:53.492 bundle.js:1846 VBrowseable       => Canonical path:    fuzztest.generator.VBrowseable
 * 2016-11-15 07:47:53.492 bundle.js:1848 VBrowseable'      => Inheritence chain: Object.VBrowseable.VNode
 * 2016-11-15 07:47:53.492 bundle.js:1849 VBrowseable'      => Canonical path:    fuzztest.generator.rule._common.VNode
 * 2016-11-15 07:47:53.493 bundle.js:1851 VBrowseable'      => Inheritence chain: Object.VBrowseable.VDeriv_01
 * 2016-11-15 07:47:53.493 bundle.js:1852 VBrowseable'      => Canonical path:    fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.VDeriv_01
 * 2016-11-15 07:47:53.494 bundle.js:1854 VBrowseable''     => Inheritence chain: Object.VBrowseable.VNode.VDeriv_02
 * 2016-11-15 07:47:53.495 bundle.js:1855 VBrowseable''     => Canonical path:    fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.VDeriv_02
 * 2016-11-15 07:47:53.495 bundle.js:1857 VBrowseable'^     => Inheritence chain: Object.VBrowseable
 * 2016-11-15 07:47:53.496 bundle.js:1858 VBrowseable'^     => Canonical path:    fuzztest.generator.VBrowseable
 * 2016-11-15 07:47:53.497 bundle.js:1860 VBrowseable''^    => Inheritence chain: Object.VBrowseable.VNode
 * 2016-11-15 07:47:53.497 bundle.js:1861 VBrowseable''^    => Canonical path:    fuzztest.generator.rule._common.VNode
 */
public class TDevCreateObject_02
{
    public static void CreateType ()
    {
        TClass                      c;

        TRepository.Clear ();
        
        console.log ();
        console.log ("=========================================================");
        console.log ("TDevCreateObject_02");
        console.log ("=========================================================");
        console.log ("Legend: x'  means \"a type derived from x\" (as in calculus).");
        console.log ("      : x'^ means \"a parent of a type derived from x\" (i.e. x).");
        console.log ();
        c  = VBrowseable.gkClass;
        console.log ("VBrowseable       => Inheritence chain: " + c.GetInheritPath ());
        console.log ("VBrowseable       => Canonical path:    " + c.GetCanonicalPath ());

        c  = VNode.gkClass;
        console.log ("VBrowseable'      => Inheritence chain: " + c.GetInheritPath ());
        console.log ("VBrowseable'      => Canonical path:    " + c.GetCanonicalPath ());
        
        c  = (new VDeriv_01()).GetClass ();
        console.log ("VBrowseable'      => Inheritence chain: " + c.GetInheritPath ());
        console.log ("VBrowseable'      => Canonical path:    " + c.GetCanonicalPath ());

        c  = (new VDeriv_02()).GetClass ();
        console.log ("VBrowseable''     => Inheritence chain: " + c.GetInheritPath ());
        console.log ("VBrowseable''     => Canonical path:    " + c.GetCanonicalPath ());
        
        c  = (new VDeriv_01()).GetClass ().GetParent ();
        console.log ("VBrowseable'^     => Inheritence chain: " + c.GetInheritPath ());
        console.log ("VBrowseable'^     => Canonical path:    " + c.GetCanonicalPath ());

        c  = (new VDeriv_02()).GetClass ().GetParent ();
        console.log ("VBrowseable''^    => Inheritence chain: " + c.GetInheritPath ());
        console.log ("VBrowseable''^    => Canonical path:    " + c.GetCanonicalPath ());
    }
    private static class VDeriv_01 extends VBrowseable {}
    private static class VDeriv_02 extends VNode 
    {
        protected VDeriv_02 () {super (TAttributeSet.GetNullSet ());}
        protected String _CreateData (String head){return null;}
    }
}
