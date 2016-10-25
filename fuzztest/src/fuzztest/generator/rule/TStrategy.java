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

package fuzztest.generator.rule;

/**
 * @author peter
 *
 */
public class TStrategy
{
    /**
     * Code generation strategies.
     * 
     * @author peter
     */
    public static enum ERuleAdhesion
    {
        kFollowRule,            /* Strictly follow the grammar rule, i.e. generate fragment that matches the rule.  */
        kInjectInvalids,        /* Randomly inject fragments that that don't match the current grammar rule.        */
        kFollowOpposite         /* Only use fragments that don't match the current grammar rule                     */
    }

    private int                     fRecursionCounter;
    private int                     fRecursionMax;
    private ERuleAdhesion           fRuleAdhesion;
    private int                     fRepeatMax;
    
    public TStrategy 
    (
        int             recursionMax, 
        ERuleAdhesion   ruleAdhesion,
        int             repeatMax
    )
    {
        _AssertParamsOK (recursionMax, ruleAdhesion, repeatMax);
        fRecursionMax       = recursionMax;
        fRuleAdhesion       = ruleAdhesion;
        fRepeatMax          = repeatMax;
    }
    
    /**
     * @return
     */
    public boolean CanEnter ()
    {
        boolean ret;
        
        ret = (fRecursionCounter <= fRecursionMax);
        
        return ret;
    }
    
    public ERuleAdhesion GetRuleAdhesion ()
    {
        return fRuleAdhesion;
    }
    
    public int GetNumRepeatsMax ()
    {
        return fRepeatMax;
    }
    
    public int GetNumVisitsMax ()
    {
        return fRecursionMax;
    }
    
    private void _AssertParamsOK
    (
        int             recursionMax, 
        ERuleAdhesion   ruleAdhesion,
        int             repeatMax
    )
    {
        System.out.println ("Warning: TStrategy::_AssertParamsOK(...): Must implement.");
    }
}
