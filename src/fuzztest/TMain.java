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

package fuzztest;

import fuzztest._dev_concepts.grammar.build.TDevBuildGrammar_01;
import fuzztest._dev_concepts.math.rnd.TDevRnd_01;
import fuzztest._dev_concepts.math.rnd.TDevRnd_02;
import fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02;
import fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevQueryObject_01;
import fuzztest._dev_concepts.objects.repo.del.TDevRepoDel_01;
//import fuzztest._dev_concepts.objects.repository.delete.TDevRepositoryDelete_01;

/**
 * @author peter
 *
 */
public class TMain
{
    /**
     * @param args
     */
    public static void main (String[] args)
    {
        TDevRnd_01.RunRnd_01 ();
        TDevRnd_02.RunRnd_02 ();
        TDevCreateObject_02.CreateType ();
        TDevRepoDel_01.TRepoDelTest_01 ();
        TDevQueryObject_01.Query ();
        TDevBuildGrammar_01.TestTree01 ();
    }
}
