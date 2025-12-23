import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface HeatLossElement {
  element: string;
  area: number;
  meanTemp: number;
  heatFlux: number;
  uValueP10: number;
  uValueP90: number;
  contribution: number;
}

interface HeatLossAnalysisProps {
  elements: HeatLossElement[];
}

const HeatLossAnalysis = ({ elements }: HeatLossAnalysisProps) => {
  const chartData = elements.map((el) => ({
    name: el.element,
    value: el.contribution,
  }));

  const colors = ['hsl(var(--primary))', 'hsl(var(--analytics-pink))', 'hsl(var(--analytics-green))', 'hsl(var(--muted-foreground))'];

  return (
    <div className="border border-foreground/10">
      <div className="p-4 border-b border-foreground/10">
        <h4 className="font-mono text-xs tracking-wider text-muted-foreground">HEAT LOSS BY ELEMENT</h4>
      </div>

      <div className="grid lg:grid-cols-2 divide-x divide-foreground/10">
        {/* Chart */}
        <div className="p-4">
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category"
                stroke="hsl(var(--muted-foreground))" 
                fontSize={10}
                tickLine={false}
                axisLine={false}
                fontFamily="JetBrains Mono"
                width={80}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px'
                }}
                formatter={(value: number) => [`${value}%`, 'Contribution']}
              />
              <Bar dataKey="value" radius={0}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-foreground/10 text-muted-foreground">
                <th className="p-3 text-left tracking-wider">ELEMENT</th>
                <th className="p-3 text-right tracking-wider">AREA m²</th>
                <th className="p-3 text-right tracking-wider">TEMP °C</th>
                <th className="p-3 text-right tracking-wider">FLUX W/m²</th>
                <th className="p-3 text-right tracking-wider">U-VALUE</th>
              </tr>
            </thead>
            <tbody>
              {elements.map((el, i) => (
                <tr key={i} className="border-b border-foreground/5 text-foreground">
                  <td className="p-3">{el.element}</td>
                  <td className="p-3 text-right">{el.area}</td>
                  <td className="p-3 text-right">{el.meanTemp}°</td>
                  <td className="p-3 text-right">{el.heatFlux}</td>
                  <td className="p-3 text-right text-muted-foreground">{el.uValueP10}–{el.uValueP90}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HeatLossAnalysis;
