import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx'
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Download, 
  BarChart3, 
  Brain, 
  Shield, 
  Zap,
  Eye,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('upload')
  const fileInputRef = useRef(null)

  // Simular dados de análise para demonstração
  const mockAnalysisResults = {
    summary: {
      totalItems: 150,
      approved: 89,
      rejected: 61,
      approvalRate: 59.3,
      processingTime: 45.2,
      confidenceScore: 0.847
    },
    items: [
      {
        id: 'item_001',
        title: 'Artigo sobre mudanças climáticas',
        status: 'approved',
        confidence: 0.92,
        sentiment: 'neutral',
        biasRisk: 0.15,
        flags: ['factual', 'well-sourced']
      },
      {
        id: 'item_002', 
        title: 'Post sobre política econômica',
        status: 'rejected',
        confidence: 0.73,
        sentiment: 'negative',
        biasRisk: 0.68,
        flags: ['bias-detected', 'emotional-language']
      },
      {
        id: 'item_003',
        title: 'Notícia sobre tecnologia',
        status: 'approved',
        confidence: 0.88,
        sentiment: 'positive',
        biasRisk: 0.22,
        flags: ['verified-sources', 'balanced']
      }
    ],
    analytics: {
      sentimentDistribution: {
        positive: 45,
        neutral: 67,
        negative: 38
      },
      biasCategories: {
        political: 23,
        commercial: 15,
        cultural: 8,
        none: 104
      },
      confidenceRanges: {
        high: 89,
        medium: 45,
        low: 16
      }
    }
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setActiveTab('analysis')
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
      setActiveTab('analysis')
    }
  }

  const startAnalysis = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simular progresso da análise
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsAnalyzing(false)
          setAnalysisResults(mockAnalysisResults)
          setActiveTab('results')
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const exportResults = () => {
    if (!analysisResults) return

    const dataStr = JSON.stringify(analysisResults, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `analise_ia_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Verifier</h1>
                <p className="text-sm text-gray-600">Sistema de Verificação Externa</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Zap className="w-3 h-3 mr-1" />
                Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>Análise</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Resultados</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
              <CardContent className="p-8">
                <div 
                  className="text-center space-y-4"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Selecione um arquivo para análise
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Arraste e solte ou clique para selecionar arquivos JSON, CSV ou TXT
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Selecionar Arquivo
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json,.csv,.txt"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                  {selectedFile && (
                    <Alert className="mt-4 bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">Arquivo selecionado</AlertTitle>
                      <AlertDescription className="text-green-700">
                        {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">Análise Inteligente</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Utiliza múltiplos algoritmos de IA para detectar viés, desinformação e analisar sentimentos em tempo real.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg">Verificação Robusta</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sistema de regras avançado com limiares de confiança configuráveis para máxima precisão.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg">Relatórios Detalhados</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Exportação completa de resultados com métricas, gráficos e análises contextuais.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Configuração da Análise</span>
                </CardTitle>
                <CardDescription>
                  Configure os parâmetros de análise antes de iniciar o processamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedFile && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">Arquivo carregado</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      {selectedFile.name} - Pronto para análise
                    </AlertDescription>
                  </Alert>
                )}

                {isAnalyzing && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progresso da análise</span>
                      <span className="text-sm text-gray-600">{Math.round(analysisProgress)}%</span>
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Zap className="w-4 h-4 animate-pulse" />
                      <span>Processando análise de sentimento, detecção de viés e verificação contextual...</span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button 
                    onClick={startAnalysis}
                    disabled={!selectedFile || isAnalyzing}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-pulse" />
                        Analisando...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Iniciar Análise
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {analysisResults ? (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-800">Aprovados</p>
                          <p className="text-2xl font-bold text-green-900">{analysisResults.summary.approved}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-red-800">Rejeitados</p>
                          <p className="text-2xl font-bold text-red-900">{analysisResults.summary.rejected}</p>
                        </div>
                        <XCircle className="w-8 h-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-800">Taxa de Aprovação</p>
                          <p className="text-2xl font-bold text-blue-900">{analysisResults.summary.approvalRate}%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-800">Confiança Média</p>
                          <p className="text-2xl font-bold text-purple-900">{(analysisResults.summary.confidenceScore * 100).toFixed(1)}%</p>
                        </div>
                        <Shield className="w-8 h-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>Resultados Detalhados</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResults.items.map((item, index) => (
                        <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-medium text-gray-900">{item.title}</h4>
                                <Badge className={getStatusColor(item.status)}>
                                  {getStatusIcon(item.status)}
                                  <span className="ml-1 capitalize">{item.status}</span>
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600">Confiança:</span>
                                  <span className="ml-1 font-medium">{(item.confidence * 100).toFixed(1)}%</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Sentimento:</span>
                                  <span className="ml-1 font-medium capitalize">{item.sentiment}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Risco de Viés:</span>
                                  <span className="ml-1 font-medium">{(item.biasRisk * 100).toFixed(1)}%</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Flags:</span>
                                  <span className="ml-1 font-medium">{item.flags.length}</span>
                                </div>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {item.flags.map((flag, flagIndex) => (
                                  <Badge key={flagIndex} variant="outline" className="text-xs">
                                    {flag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma análise disponível</h3>
                  <p className="text-gray-600">Execute uma análise primeiro para ver os resultados aqui.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Exportar Resultados</span>
                </CardTitle>
                <CardDescription>
                  Baixe os resultados da análise em diferentes formatos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisResults ? (
                  <div className="space-y-4">
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">Resultados disponíveis</AlertTitle>
                      <AlertDescription className="text-green-700">
                        Análise concluída com {analysisResults.summary.totalItems} itens processados
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button onClick={exportResults} className="h-auto p-4 justify-start">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-6 h-6" />
                          <div className="text-left">
                            <div className="font-medium">Relatório JSON</div>
                            <div className="text-sm text-gray-600">Dados completos da análise</div>
                          </div>
                        </div>
                      </Button>

                      <Button variant="outline" className="h-auto p-4 justify-start" disabled>
                        <div className="flex items-center space-x-3">
                          <BarChart3 className="w-6 h-6" />
                          <div className="text-left">
                            <div className="font-medium">Relatório PDF</div>
                            <div className="text-sm text-gray-600">Em breve</div>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Nenhum resultado para exportar</AlertTitle>
                    <AlertDescription>
                      Execute uma análise primeiro para gerar resultados exportáveis.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App
