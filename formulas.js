const impacts = {
    ghg: "GHG (kg CO2e/kg)",
    water: "Water Use (kl/kg)",
    land: "Land Use (m2/kg)"
};
const types = DATA_SOURCE.map(item => item["Food Group"]);

const adjustedConsumption = (type, percentage) => {
    const dataSource = DATA_SOURCE.find(item => item["Food Group"] === type);
    const adjusted = dataSource["Compensation Factor"] === -1 
        ? dataSource["Default Global Per Capita Consumption (kg/year)"] * (1 - percentage)
        : dataSource["Default Global Per Capita Consumption (kg/year)"] * (1 + percentage * dataSource["Compensation Factor"]);
    return adjusted;
};

const calcImpact = (type, impact, percentage, people) => {
    const dataSource = DATA_SOURCE.find(item => item["Food Group"] === type);
    const totalConsumption = adjustedConsumption(type, percentage);
    return totalConsumption * dataSource[impact] * people;
};

const calcAnimalsSlaughtered = (type, people, percentage) => {
    const dataSource = DATA_SOURCE.find(item => item["Food Group"] === type);
    const totalConsumption = adjustedConsumption(type, percentage);
    const animals = dataSource["Average Dressed Weight (kg)"] > 0 
        ? totalConsumption * dataSource["Average Dressed Weight (kg)"] * people
        : 0;
    return animals;
};

const calcImpactSaved = (type, impact, percentage, people) => {
    const dataSource = DATA_SOURCE.find(item => item["Food Group"] === type);
    return (dataSource["Default Global Per Capita Consumption (kg/year)"] * dataSource[impact] * people) - calcImpact(type, impact, percentage, people);
};

const calcAnimalsSaved = (type, people, percentage) => {
    const dataSource = DATA_SOURCE.find(item => item["Food Group"] === type);
    const totalConsumption = adjustedConsumption(type, percentage);
    const saved = dataSource["Average Dressed Weight (kg)"] > 0 
        ? (dataSource["Default Global Per Capita Consumption (kg/year)"] - totalConsumption) / dataSource["Average Dressed Weight (kg)"] * people
        : 0;
    return saved;
};

const aggregateImpactSaved = (impact, people, percentage) => {
    return types.reduce((total, type) => total + calcImpactSaved(type, impact, percentage, people), 0);
};

const aggregateAnimalsSaved = (people, percentage) => {
    return types.reduce((total, type) => total + calcAnimalsSaved(type, people, percentage), 0);
};
const calcBaselineImpact = (impact, people) => {
    return types.reduce((total, type) => {
        const dataSource = DATA_SOURCE.find(item => item["Food Group"] === type);    
        return total + dataSource["Default Global Per Capita Consumption (kg/year)"] * dataSource[impact] * people
    }, 0);
};
const calcBaselineAnimalsSlaughtered = (people) => {
    return types.reduce((total, type) => {
        const dataSource = DATA_SOURCE.find(item => item["Food Group"] === type);    
        const totalConsumption = dataSource["Default Global Per Capita Consumption (kg/year)"];
        const animals = dataSource["Average Dressed Weight (kg)"] > 0 
            ? totalConsumption / dataSource["Average Dressed Weight (kg)"] * people
            : 0;
        return total + animals;
    }, 0);
}
const updateAllCalculations = (people, percentage) => {
    const stats = Object.entries(impacts).map(([key, impact]) => {
        return {
            key: key,
            impact: impact, 
            saved: aggregateImpactSaved(impact, people, percentage).toFixed(2), 
            baseline: calcBaselineImpact(impact, people).toFixed(2)
        };
    });
    stats.push({
        key: "animals",
        impact: "Animals", 
        saved: aggregateAnimalsSaved(people, percentage).toFixed(0), 
        baseline: calcBaselineAnimalsSlaughtered(people).toFixed(0)
    });
    return stats;
};