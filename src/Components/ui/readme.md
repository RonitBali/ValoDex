import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { getDatabase, ref, onValue } from "firebase/database"
import { getMessaging, onMessage, getToken } from "firebase/messaging"
import { app } from "../../Firebase"
import { useNavigate, Link } from "react-router-dom"
import "../Home/Home.css"
import blood from "../../assets/blood.png"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Bell, Droplet, MapPin, Users, Heart, ArrowRight, ChevronRight, MessageCircle } from "lucide-react"

const Home = () => {
  const navigate = useNavigate()
  const auth = getAuth(app)
  const database = getDatabase()
  const messaging = getMessaging(app)

  const [user, setUser] = useState(null)
  const [donationRequests, setDonationRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [stats, setStats] = useState({
    donors: 1250,
    donations: 3480,
    lives: 10440,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        requestNotificationPermission()
      } else {
        navigate("/signin")
      }
    })
    return () => unsubscribe()
  }, [auth, navigate])

  useEffect(() => {
    const donationRequestsRef = ref(database, "donation_requests")
    onValue(donationRequestsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setDonationRequests(Object.values(data))
      }
      setLoading(false)
    })
  }, [database])

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("New notification:", payload)
      setNotifications((prev) => [...prev, payload.notification])
    })
  }, [messaging])

  const requestNotificationPermission = async () => {
    try {
      const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" })
      console.log("Notification token:", token)
    } catch (error) {
      console.error("Error getting notification token:", error)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/signin")
  }

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const getRandomBloodGroup = () => bloodGroups[Math.floor(Math.random() * bloodGroups.length)]

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Flow4Life connected me with a donor when my father needed emergency surgery. Forever grateful!",
      bloodGroup: "O+",
    },
    {
      name: "Michael Chen",
      text: "I donate regularly through Flow4Life. The platform makes it easy to help those in need.",
      bloodGroup: "A-",
    },
    {
      name: "Priya Sharma",
      text: "This platform saved my sister's life. Found a rare blood type donor within hours!",
      bloodGroup: "AB-",
    },
  ]

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation Bar */}
      <motion.nav
        className="sticky top-0 z-50 bg-white shadow-md px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <motion.img
              src={blood}
              alt="Flow4Life"
              className="h-10 sm:h-12"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Flow4Life
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-800 hover:text-red-500 font-medium transition-colors">
              Home
            </Link>
            <Link to="/finddonor" className="text-gray-800 hover:text-red-500 font-medium transition-colors">
              Find Donors
            </Link>
            <Link to="/requestform" className="text-gray-800 hover:text-red-500 font-medium transition-colors">
              Request Blood
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <h3 className="px-4 py-2 font-semibold border-b">Notifications</h3>
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <div key={index} className="px-4 py-3 hover:bg-gray-50 border-b last:border-b-0">
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.body}</p>
                        </div>
                      ))
                    ) : (
                      <p className="px-4 py-3 text-gray-500">No new notifications</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/signin"
                className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="absolute top-0 right-0 h-screen w-64 bg-white shadow-lg p-5 space-y-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-red-500">Menu</h2>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-4">
                <Link to="/" className="flex items-center gap-2 py-2 hover:text-red-500 transition-colors">
                  <Home size={18} />
                  <span>Home</span>
                </Link>
                <Link to="/finddonor" className="flex items-center gap-2 py-2 hover:text-red-500 transition-colors">
                  <Users size={18} />
                  <span>Find Donors</span>
                </Link>
                <Link to="/requestform" className="flex items-center gap-2 py-2 hover:text-red-500 transition-colors">
                  <Droplet size={18} />
                  <span>Request Blood</span>
                </Link>
                <Link to="/chats" className="flex items-center gap-2 py-2 hover:text-red-500 transition-colors">
                  <MessageCircle size={18} />
                  <span>View Chats</span>
                </Link>
              </div>

              <div className="pt-4 border-t">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors block text-center"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8 py-10 md:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:w-1/2 space-y-6">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Donate Blood, <span className="text-red-500">Save Lives</span>
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Connect with blood donors in your area or register to donate. Every donation can save up to three lives.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={() => navigate("/donate")}
                className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-colors flex items-center gap-2 hover:gap-3"
              >
                <Droplet size={20} />
                <span>Donate Blood</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/requestform")}
                className="bg-white border-2 border-red-500 text-red-500 px-6 py-3 rounded-lg shadow-sm hover:bg-red-50 transition-colors"
              >
                Request Blood
              </button>
            </motion.div>
          </div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Blood Donation"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 bg-white rounded-2xl shadow-md my-12 p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-red-500 mb-4" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">{stats.donors.toLocaleString()}</h3>
            <p className="text-gray-600 mt-2">Registered Donors</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Droplet className="h-12 w-12 text-red-500 mb-4" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">{stats.donations.toLocaleString()}</h3>
            <p className="text-gray-600 mt-2">Successful Donations</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Heart className="h-12 w-12 text-red-500 mb-4" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">{stats.lives.toLocaleString()}</h3>
            <p className="text-gray-600 mt-2">Lives Saved</p>
          </div>
        </motion.div>

        {/* Donation Requests Section */}
        <motion.div
          className="py-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Recent Blood Requests</h2>
            <Link to="/finddonor" className="text-red-500 hover:text-red-600 flex items-center gap-1">
              View all <ChevronRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-red-200 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-red-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-red-200 rounded"></div>
                    <div className="h-4 bg-red-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {donationRequests.slice(0, 6).map((request, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 relative overflow-hidden"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(`/donor/${request.userId}`)}
                >
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="bg-red-500 text-white text-xs font-bold py-1 transform rotate-45 origin-bottom-right w-24 text-center absolute top-4 right-[-5px]">
                      URGENT
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold">{request.bloodGroup || getRandomBloodGroup()}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{request.fullName}</h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin size={16} className="mr-1" />
                        <span>{request.city}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {request.message || "Needs blood donation urgently. Please contact if you can help."}
                      </p>
                      <button
                        className="mt-4 text-red-500 hover:text-red-600 text-sm font-medium flex items-center"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/donor/${request.userId}`)
                        }}
                      >
                        Contact Donor <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && donationRequests.length === 0 && (
            <div className="text-center py-10">
              <Droplet size={48} className="mx-auto text-red-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">No donation requests yet</h3>
              <p className="text-gray-500 mt-2">Be the first to request blood donation</p>
              <button
                onClick={() => navigate("/requestform")}
                className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Request Blood
              </button>
            </div>
          )}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="py-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Stories from Our Community</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-600 font-bold text-sm">{testimonial.bloodGroup}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-red-600 to-red-400 rounded-2xl p-8 md:p-12 my-12 text-white text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Your donation can save up to three lives. Join our community of donors today and be someone's hero in their
            time of need.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/donate")}
              className="bg-white text-red-500 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              Become a Donor
            </button>
            <button
              onClick={() => navigate("/chats")}
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              View Your Chats
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <img src={blood || "/placeholder.svg"} alt="Flow4Life" className="h-10" />
              <h2 className="text-2xl font-bold">Flow4Life</h2>
            </div>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-red-400 transition-colors">
                Home
              </Link>
              <Link to="/finddonor" className="hover:text-red-400 transition-colors">
                Find Donors
              </Link>
              <Link to="/requestform" className="hover:text-red-400 transition-colors">
                Request Blood
              </Link>
              <Link to="/about" className="hover:text-red-400 transition-colors">
                About Us
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Flow4Life. All rights reserved.</p>
            <p className="mt-2">Saving lives through blood donation.</p>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default Home

