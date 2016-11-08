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

import jsweet.lang.RangeError;

/**
 * @author peter
 *
 */
public class TStrategy
{
    public static final int         kRecursionLimit     = 15;
    public static final int         kRepeatLimit        = 100;
    
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
        if (recursionMax <= 0  || recursionMax > kRecursionLimit)
        {
            throw new RangeError ("recursionMax out of range. Allowed: [1, " + kRecursionLimit + "], Given:" + recursionMax);
        }
        
        if (repeatMax < 0  ||  repeatMax > kRepeatLimit)
        {
            throw new RangeError ("repeatMax out of range. Allowed: [0, " + kRepeatLimit + "], Given: " + repeatMax);
        }
    }
}
