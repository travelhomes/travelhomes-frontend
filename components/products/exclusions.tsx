export default function Exclusions() {
    const inclusions = [
      "Toilet will have consumables like toothpaste, soap, shampoo, air freshener, etc.",
      "Blankets, bed sheets, and pillows for everyone.",
      "The kitchen will have an LPG cylinder, basic spices, salt, oil, tea, sugar, basic kitchen utensils, and crockeries.",
      "However, customers have to bring their groceries for the kitchen or heat and eat packed food items can be provided at MRP if requested by customers before the journey begins.",
    ]
  
    return (
      <div className="p-4 border-b w-full md:w-[65%]">
        <div className="mb-8" id="exclusions">
          <h2 className="text-xl font-bold mb-4">Exclusions</h2>
          <ul className="space-y-2">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  
  