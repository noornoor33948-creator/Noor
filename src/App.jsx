import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Camera, Play, Image, FileText, Volume2, Box, Share2, X, QrCode } from 'lucide-react'
import './App.css'
import cemeteryImage from './assets/cemetery.jpg'
import familyPhoto from './assets/family-photo.jpg'
import qrCodeImage from './assets/qr-code.png'

function App() {
  const [currentView, setCurrentView] = useState('welcome') // welcome, camera, ar-view
  const [isScanning, setIsScanning] = useState(false)
  const [showMemories, setShowMemories] = useState(false)
  const [activeMemory, setActiveMemory] = useState(null)
  const [scanProgress, setScanProgress] = useState(0)

  // محاكاة عملية مسح QR
  const startScanning = () => {
    setIsScanning(true)
    setScanProgress(0)
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          setShowMemories(true)
          setCurrentView('ar-view')
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const memories = [
    {
      id: 1,
      type: 'photo',
      title: 'صورة عائلية قديمة',
      content: familyPhoto,
      description: 'صورة تذكارية من عام 1950'
    },
    {
      id: 2,
      type: 'video',
      title: 'فيديو تذكاري',
      content: 'مقطع فيديو من حفل الزفاف',
      description: 'لحظات جميلة من الماضي'
    },
    {
      id: 3,
      type: 'text',
      title: 'رسالة مكتوبة',
      content: 'رسالة حب مكتوبة بخط اليد',
      description: 'كلمات من القلب'
    },
    {
      id: 4,
      type: 'audio',
      title: 'تسجيل صوتي',
      content: 'تسجيل صوتي للجد يحكي قصة',
      description: 'حكايات من الزمن الجميل'
    }
  ]

  const getMemoryIcon = (type) => {
    switch (type) {
      case 'photo': return <Image className="w-6 h-6" />
      case 'video': return <Play className="w-6 h-6" />
      case 'text': return <FileText className="w-6 h-6" />
      case 'audio': return <Volume2 className="w-6 h-6" />
      case '3d': return <Box className="w-6 h-6" />
      default: return <Image className="w-6 h-6" />
    }
  }

  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              الواقع المعزز للذكريات
            </h1>
            <p className="text-blue-700 text-lg">
              اكتشف الذكريات الرقمية في الأماكن التذكارية
            </p>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-right">كيفية الاستخدام:</h2>
              <div className="space-y-3 text-right">
                <div className="flex items-center justify-end gap-3">
                  <span>وجه الكاميرا نحو رمز QR</span>
                  <QrCode className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span>انتظر حتى يتم التعرف على الرمز</span>
                  <Camera className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span>استمتع بتجربة الواقع المعزز</span>
                  <Play className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => setCurrentView('camera')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
          >
            <Camera className="w-5 h-5 mr-2" />
            بدء التجربة
          </Button>
        </div>
      </div>
    )
  }

  if (currentView === 'camera') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* خلفية الكاميرا المحاكية */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cemeteryImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        {/* واجهة الكاميرا */}
        <div className="relative z-10 h-screen flex flex-col">
          {/* شريط علوي */}
          <div className="flex justify-between items-center p-4 bg-black bg-opacity-50">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentView('welcome')}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <X className="w-5 h-5" />
            </Button>
            <h2 className="text-white font-semibold">مسح رمز QR</h2>
            <div className="w-8"></div>
          </div>

          {/* منطقة المسح */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative">
              {/* إطار المسح */}
              <div className="w-64 h-64 border-4 border-white border-opacity-50 rounded-lg relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-lg"></div>
                
                {/* رمز QR في المنتصف */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={qrCodeImage} 
                    alt="QR Code" 
                    className="w-32 h-32 opacity-80"
                  />
                </div>

                {/* خط المسح المتحرك */}
                {isScanning && (
                  <div 
                    className="absolute left-0 right-0 h-1 bg-blue-400 transition-all duration-200"
                    style={{ top: `${scanProgress}%` }}
                  ></div>
                )}
              </div>

              {/* نص التوجيه */}
              <p className="text-white text-center mt-4 text-lg">
                {isScanning ? `جاري المسح... ${scanProgress}%` : 'وجه الكاميرا نحو رمز QR'}
              </p>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="p-6 bg-black bg-opacity-50">
            <Button 
              onClick={startScanning}
              disabled={isScanning}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            >
              {isScanning ? 'جاري المسح...' : 'مسح رمز QR'}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'ar-view') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* خلفية الكاميرا */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cemeteryImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>

        {/* عناصر الواقع المعزز */}
        <div className="relative z-10 h-screen">
          {/* شريط علوي */}
          <div className="flex justify-between items-center p-4 bg-black bg-opacity-50">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentView('camera')}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <X className="w-5 h-5" />
            </Button>
            <h2 className="text-white font-semibold">الواقع المعزز</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* عناصر الذكريات العائمة */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="grid grid-cols-2 gap-4">
              {memories.map((memory, index) => (
                <Card 
                  key={memory.id}
                  className="w-32 h-32 bg-white bg-opacity-90 backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => setActiveMemory(memory)}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                    <div className="text-blue-600 mb-2">
                      {getMemoryIcon(memory.type)}
                    </div>
                    <p className="text-xs text-center font-medium text-gray-800">
                      {memory.title}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* نافذة عرض الذكرى */}
          {activeMemory && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
              <Card className="max-w-sm w-full bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-right">{activeMemory.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveMemory(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    {activeMemory.type === 'photo' && (
                      <img 
                        src={activeMemory.content} 
                        alt={activeMemory.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                    {activeMemory.type === 'video' && (
                      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Play className="w-12 h-12 text-gray-600" />
                      </div>
                    )}
                    {activeMemory.type === 'text' && (
                      <div className="w-full h-48 bg-yellow-50 rounded-lg p-4 flex items-center justify-center">
                        <p className="text-center text-gray-800 italic">
                          "{activeMemory.content}"
                        </p>
                      </div>
                    )}
                    {activeMemory.type === 'audio' && (
                      <div className="w-full h-48 bg-blue-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Volume2 className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                          <p className="text-gray-800">{activeMemory.content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-center mb-4">
                    {activeMemory.description}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Share2 className="w-4 h-4 mr-2" />
                      مشاركة
                    </Button>
                    <Button variant="outline" className="flex-1">
                      حفظ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* مؤشر الحالة */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <Card className="bg-white bg-opacity-90 backdrop-blur-sm">
              <CardContent className="px-4 py-2">
                <p className="text-sm text-gray-800 text-center">
                  تم العثور على {memories.length} ذكرى رقمية
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default App

