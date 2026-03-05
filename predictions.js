class PredictionManager {
    constructor() {
        this.modelInfo = null;
        this.lastPrediction = null;
        this.init();
    }

    async init() {
        this.setupFormHandler();
        await this.loadModelInfo();
        // perform a default prediction to display charts immediately
        const defaultData = {
            rainfall: 0,
            river_level: 0,
            previous_flooding: 0,
            topographic_map: 0,
            soil_type: 0,
            proximity_to_river: 0,
            drainage_system: 0,
            weather_forecast: 0,
            satellite_imagery: 0,
            population_density: 0,
            infrastructure_resilience: 0,
            land_use: 0,
            elevation: 0,
            historical_data: 0,
            water_speed: 0,
            ground_saturation: 0,
            temperature: 0,
            humidity: 0,
            wind_speed: 0,
            atmospheric_pressure: 0,
            vegetation_index: 0,
            urban_development: 0,
            water_management_practices: 0,
            early_warning_systems: 0,
            community_preparedness: 0
        };
        this.makePrediction(defaultData);
    }

    setupFormHandler() {
        const form = document.getElementById('predictionForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    async loadModelInfo() {
        try {
            this.modelInfo = await FloodMonitoringAPI.getModelInfo();
            this.displayModelInfo();
        } catch (error) {
            console.error('Failed to load model info:', error);
        }
    }

    displayModelInfo() {
        if (!this.modelInfo) return;
        
        const banner = document.getElementById('modelInfo');
        const typeSpan = document.getElementById('modelType');
        const statusSpan = document.getElementById('trainStatus');
        
        if (this.modelInfo.is_trained_model) {
            typeSpan.textContent = '✓ Trained ' + this.modelInfo.algorithm;
            typeSpan.className = 'badge badge-success';
            statusSpan.textContent = `Trained: ${new Date(this.modelInfo.trained_at).toLocaleDateString()} | Accuracy: ${(this.modelInfo.train_accuracy * 100).toFixed(1)}%`;
            statusSpan.className = 'badge badge-info';
        } else {
            typeSpan.textContent = 'Fallback Model';
            typeSpan.className = 'badge badge-warning';
            statusSpan.textContent = 'Using rule-based predictions';
            statusSpan.className = 'badge badge-warning';
        }
        
        banner.style.display = 'block';
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(document.getElementById('predictionForm'));
        const predictionData = Object.fromEntries(formData);
        
        // Fill in default values for fields not in the form
        const completeData = {
            rainfall: parseFloat(predictionData.rainfall) || 0,
            river_level: parseFloat(predictionData.river_level) || 0,
            previous_flooding: 0,
            topographic_map: 0,
            soil_type: 0,
            proximity_to_river: 1,
            drainage_system: 1,
            weather_forecast: 0,
            satellite_imagery: 0,
            population_density: 0,
            infrastructure_resilience: 2.5,
            land_use: 0,
            elevation: 100,
            historical_data: 0.5,
            water_speed: 0,
            ground_saturation: parseFloat(predictionData.ground_saturation) || 0.5,
            temperature: parseFloat(predictionData.temperature) || 25,
            humidity: 65,
            wind_speed: 5,
            atmospheric_pressure: 1013,
            vegetation_index: 0.5,
            urban_development: 0,
            water_management_practices: 1,
            early_warning_systems: 1,
            community_preparedness: 1
        };
        
        await this.makePrediction(completeData);
    }

    async makePrediction(predictionData) {
        try {
            const resultDiv = document.getElementById('predictionResult');
            resultDiv.innerHTML = '<div class="loading">🔄 Analyzing data with trained ML model...</div>';
            
            const response = await FloodMonitoringAPI.predictFloodRisk(predictionData);
            this.lastPrediction = response;
            this.displayDetailedResults(response);
        } catch (error) {
            const resultDiv = document.getElementById('predictionResult');
            resultDiv.innerHTML = `<div class="error-box">❌ Error: ${error.message}</div>`;
        }
    }

    displayDetailedResults(response) {
        const resultDiv = document.getElementById('predictionResult');
        
        if (!response.success) {
            resultDiv.innerHTML = `<div class="error-box">Error: ${response.message}</div>`;
            return;
        }

        const pred = response.prediction;
        const confidence = response.model_confidence || 0;
        const riskClass = this.getRiskClass(confidence);
        const riskLabel = pred.risk_level ? pred.risk_level.toUpperCase() : 'UNKNOWN';
        
        // Gather input parameters that were provided
        const inputData = response.input_data || {};
        
        const html = `
            <div class="prediction-results-container">
                <!-- Main Prediction Card -->
                <div class="main-result-card ${riskClass}">
                    <div class="result-header">
                        <h2>🎯 Prediction Result</h2>
                        <div class="timestamp">${new Date(response.timestamp).toLocaleString()}</div>
                    </div>
                    
                    <div class="result-grid">
                        <div class="result-item">
                            <div class="result-label">Flood Risk Level</div>
                            <div class="risk-badge ${riskClass}">${riskLabel}</div>
                        </div>
                        
                        <div class="result-item">
                            <div class="result-label">Model Prediction</div>
                            <div class="prediction-value">${pred.prediction === 1 ? '⚠️ High Risk' : '✅ Low Risk'}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Confidence Score -->
                <div class="detail-card">
                    <h3>📈 Model Confidence</h3>
                    <div class="confidence-display">
                        <div class="confidence-percentage">${(confidence * 100).toFixed(1)}%</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${confidence * 100}%"></div>
                        </div>
                        <div class="confidence-label">
                            ${confidence > 0.8 ? '🔒 Very High Confidence' : 
                              confidence > 0.6 ? '✓ High Confidence' :
                              confidence > 0.4 ? '~ Medium Confidence' : '? Low Confidence'}
                        </div>
                    </div>
                </div>
                
                <!-- Input Data Used -->
                <div class="detail-card">
                    <h3>📥 Input Parameters</h3>
                    <div class="input-params">
                        ${this.formatInputParams(inputData)}
                    </div>
                </div>
                
                <!-- Model Information -->
                ${this.modelInfo ? `
                <div class="detail-card">
                    <h3>🤖 Model Information</h3>
                    <div class="model-details">
                        <div class="model-row">
                            <span class="label">Model Type:</span>
                            <span class="value">${this.modelInfo.algorithm}</span>
                        </div>
                        <div class="model-row">
                            <span class="label">Status:</span>
                            <span class="value">${this.modelInfo.is_trained_model ? '✓ Trained' : '• Fallback'}</span>
                        </div>
                        ${this.modelInfo.trained_at ? `
                        <div class="model-row">
                            <span class="label">Trained:</span>
                            <span class="value">${new Date(this.modelInfo.trained_at).toLocaleDateString()}</span>
                        </div>
                        ` : ''}
                        ${this.modelInfo.train_accuracy ? `
                        <div class="model-row">
                            <span class="label">Accuracy:</span>
                            <span class="value">${(this.modelInfo.train_accuracy * 100).toFixed(1)}%</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}
                
                <!-- Top Features -->
                ${this.modelInfo && this.modelInfo.top_features && this.modelInfo.top_features.length > 0 ? `
                <div class="detail-card">
                    <h3>⭐ Top Features (Importance)</h3>
                    <div class="features-list">
                        ${this.modelInfo.top_features.map((f, i) => `
                            <div class="feature-item">
                                <span class="feature-rank">#${i + 1}</span>
                                <span class="feature-name">${f.name}</span>
                                <div class="feature-bar">
                                    <div class="feature-fill" style="width: ${(f.importance * 100)}%"></div>
                                </div>
                                <span class="feature-value">${(f.importance * 100).toFixed(1)}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Chart Visualization -->
                <div class="detail-card">
                    <h3>📊 Visualization</h3>
                    <div class="chart-flex">
                        <canvas id="predictionChartCanvas" width="400" height="200"></canvas>
                        <canvas id="predictionPieCanvas" width="200" height="200"></canvas>
                    </div>
                </div>
                
                <!-- Message -->
                <div class="detail-card message-card">
                    <p class="message-text">📝 ${pred.message}</p>
                </div>
            </div>
        `;
        
        resultDiv.innerHTML = html;
        // render chart after DOM update
        this.renderPredictionChart(response);
    }

    formatInputParams(inputData) {
        const keyParams = ['rainfall', 'river_level', 'ground_saturation', 'temperature', 'humidity', 'wind_speed'];
        let html = '<div class="params-grid">';
        
        keyParams.forEach(key => {
            if (inputData[key] !== undefined) {
                const units = {
                    'rainfall': 'mm',
                    'river_level': 'm',
                    'temperature': '°C',
                    'humidity': '%',
                    'wind_speed': 'm/s'
                };
                const unit = units[key] || '';
                html += `
                    <div class="param">
                        <span class="param-name">${key.replace(/_/g, ' ')}:</span>
                        <span class="param-value">${parseFloat(inputData[key]).toFixed(2)} ${unit}</span>
                    </div>
                `;
            }
        });
        
        html += '</div>';
        return html;
    }

    renderPredictionChart(response) {
        // bar chart showing confidence and prediction
        const barCtx = document.getElementById('predictionChartCanvas');
        if (barCtx) {
            const prob = response.prediction.confidence || 0;
            const conf = response.model_confidence || 0;
            const dataValues = [(prob * 100).toFixed(1), (conf * 100).toFixed(1)];

            if (this.barChart) {
                this.barChart.data.datasets[0].data = dataValues;
                this.barChart.update();
            } else {
                this.barChart = new Chart(barCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Prediction (%)', 'Confidence (%)'],
                        datasets: [{
                            label: 'Percent',
                            data: dataValues,
                            backgroundColor: ['#e74c3c', '#3498db']
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: {
                                    callback: value => value + '%'
                                }
                            }
                        }
                    }
                });
            }
        }

        // pie chart showing binary split high vs low
        const pieCtx = document.getElementById('predictionPieCanvas');
        if (pieCtx) {
            const riskProb = response.prediction.confidence || 0;
            const noRiskProb = 1 - riskProb;
            const pieData = [(riskProb * 100).toFixed(1), (noRiskProb * 100).toFixed(1)];
            const labels = ['Flood Risk', 'No Flood'];
            const colors = ['#e74c3c', '#2ecc71'];

            if (this.pieChart) {
                this.pieChart.data.datasets[0].data = pieData;
                this.pieChart.update();
            } else {
                this.pieChart = new Chart(pieCtx, {
                    type: 'pie',
                    data: {
                        labels,
                        datasets: [{
                            data: pieData,
                            backgroundColor: colors
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: context => `${context.label}: ${context.parsed}%`
                                }
                            }
                        }
                    }
                });
            }
        }
    }

    getRiskClass(confidence) {
        if (confidence > 0.7) return 'risk-very-high';
        if (confidence > 0.5) return 'risk-high';
        if (confidence > 0.3) return 'risk-medium';
        return 'risk-low';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new PredictionManager();
});