import { useState, useEffect } from 'react'

const useBudget = ({ income, age, shouldCompute, currentyear }) => {
    const [budget, setbudget] = useState([])
    const [term, setterm] = useState(10)
    const [raisefactor, setraisefactor] = useState(0.1)
    const [inverse, setinverse] = useState(true)
    const [inflation, setinflation] = useState(false)
    const [roi, setroi] = useState(0.15);
    const [maturity, setmaturity] = useState(20);
    const [totalInvestment, settotalInvestment] = useState(0);
    const [totalEarnings, settotalEarnings] = useState({ siValue: 0, ciValue: 0 });
    const [profile, setprofile] = useState(0);

    useEffect(() => {
        let newBudget = []
        let newTotalInvestment = 0;

        let newRoi = inflation ? roi - 0.06 : roi;

        if (income && age && shouldCompute) {
            //Initial Year income
            let needs = Math.floor(income * 0.5)
            let wants = Math.floor(income * 0.3)
            let investements = Math.floor(income * 0.2)

            newBudget.push({
                income: income,
                raise: 0,
                needs,
                wants,
                investements,
                year: currentyear
            })
            newTotalInvestment += investements;

            for (let i = 1; i < term; i++) {
                let raise = Math.floor(raisefactor * newBudget[i - 1].income)
                let compoundedIncome = Math.floor(
                    Number(newBudget[i - 1].income) + Number(raise)
                )
                let needs = Math.floor(
                    newBudget[i - 1].needs + Number(raise * (inverse ? 0.2 : 0.5))
                )
                let wants = Math.floor(
                    newBudget[i - 1].wants + Number(raise * 0.3)
                )
                let investements = Math.floor(
                    newBudget[i - 1].investements +
                    Number(raise * (inverse ? 0.5 : 0.2))
                )
                newBudget.push({
                    income: compoundedIncome,
                    raise: raise,
                    needs,
                    wants,
                    investements,
                    year: currentyear + i
                })
                newTotalInvestment += investements;
            }

            let newTotalEarnings = 0;

            let newSiBreakDown = [];
            let newCiBreakDown = [];

            let count = 1;

            newBudget.forEach(({ investements }, index) => {
                const monthlyInvestment = investements / 12;
                const monthlyIntrest = newRoi / 12;
                const totalMonths = maturity * 12;
                for (let x = 1; x <= 12; x++) {
                    const y = monthlyInvestment * Math.pow(1 + monthlyIntrest, totalMonths + 1 - count);
                    count++;
                    newTotalEarnings = newTotalEarnings + y;
                }
                newCiBreakDown.push({ year: Number(currentyear) + Number(index), investements, earnings: Math.ceil(newTotalEarnings) })
                if (index > 0) {
                    newCiBreakDown[index].investements += newCiBreakDown[index - 1].investements
                }
            })

            setbudget(newBudget)
            settotalInvestment(newTotalInvestment);
            settotalEarnings({ siValue: 0, ciValue: Math.floor(newTotalEarnings), siBreakDown: newSiBreakDown, ciBreakDown: newCiBreakDown })
        }
    }, [shouldCompute, age, income, term, inverse, raisefactor, roi, maturity, currentyear, inflation])

    useEffect(() => {
        let profile = 2; //Asume high risk
        if (roi <= 0.1) {
            profile = 0;
        } else if (roi > 0.1 && roi <= 0.2) {
            profile = 1;
        }
        setprofile(profile)
    }, [age, roi])

    return {
        budget,
        params: {
            profile,
            term, setterm,
            raisefactor, setraisefactor,
            inverse, setinverse,
            inflation, setinflation,
            roi, setroi,
            maturity, setmaturity,
            totalInvestment,
            totalEarnings,
        }
    }
}

export default useBudget
