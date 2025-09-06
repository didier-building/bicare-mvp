import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Brain,
  Users,
  Shield,
  Smartphone,
  Globe,
  Star,
  ArrowRight,
  Mail,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle,
  Stethoscope,
  Activity,
  UserCheck,
  Calendar
} from "lucide-react";
import { T } from "@/utils/i18n.jsx";

export function Homepage({ onNavigateToPortal }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <motion.section 
        className="relative px-4 py-16 lg:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-6xl text-center">
          <motion.h1 
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            <T 
              rw="Kuraguza ubuzima bwiza binyuze muri AI n'ubufasha bw'abantu" 
              en="Empowering healthier lives through AI and human-centered care" 
            />
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <T 
              rw="Bicare ihujije tekinoroji igezweho n'ubufasha bw'inzobere kugira ngo itange ibisubizo by'ubuzima bishingiye ku muntu ku giti cye—igihe cyose, ahantu hose"
              en="Bicare combines advanced AI technology with expert human support to deliver personalized health solutions—anytime, anywhere" 
            />
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              <T rw="Injira mu rutonde rw'abahuza" en="Join the Waitlist" />
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
              <T rw="Baza kwinjira hakiri kare" en="Request Early Access" />
            </Button>
          </motion.div>
        </div>

        {/* Hero Background Illustration */}
        <motion.div 
          className="absolute inset-0 -z-10 overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl" />
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-green-200 rounded-full opacity-20 blur-xl" />
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-xl" />
        </motion.div>
      </motion.section>

      {/* Mission & Story Section */}
      <motion.section 
        className="px-4 py-16 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8" variants={itemVariants}>
            <T rw="Inshingano yacu" en="Our Mission" />
          </motion.h2>
          <motion.p className="text-lg text-gray-600 leading-relaxed" variants={itemVariants}>
            <T 
              rw="Kuri Bicare, inshingano yacu ni yoroshye: gukora ubufasha bw'ubuzima bwiza bushoboka kuri buri wese. Tuhuza icyuho kiri hagati ya tekinoroji n'impuhwe z'abantu—dutanga ubuyobozi bw'imirire, ubufasha bw'ubwoba bw'ubwoba, n'amahugurwa y'abayobozi binyuze mu gahunda y'ikoranabuhanga yogoye."
              en="At Bicare, our mission is simple: to make quality healthcare support accessible to everyone. We bridge the gap between technology and human compassion—providing nutrition guidance, mental health support, and caregiver training through a seamless digital platform." 
            />
          </motion.p>
        </div>
      </motion.section>

      {/* What Makes Us Different */}
      <motion.section 
        className="px-4 py-16 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              <T rw="Kuki uhitamo Bicare?" en="Why Choose Bicare?" />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    <T rw="Ubufasha bwuzuye" en="Comprehensive Support" />
                  </h3>
                  <p className="text-gray-600 text-sm">
                    <T rw="Kuva mu mirire kugeza ku mutwe, byose kuri platforme imwe" en="From nutrition to psychology, all in one platform" />
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    <T rw="AI + Ubumenyi bw'abantu" en="AI + Human Expertise" />
                  </h3>
                  <p className="text-gray-600 text-sm">
                    <T rw="Tekinoroji yubwenge ihujwe n'ubuvuzi bw'inzobere" en="Smart technology combined with professional care" />
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Smartphone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    <T rw="Igihe cyose, Ahantu hose" en="Anytime, Anywhere" />
                  </h3>
                  <p className="text-gray-600 text-sm">
                    <T rw="Kwinjira mu bufasha kure igihe cyose ushatse" en="Remote access to services on-demand" />
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    <T rw="Itsinda rishingiye ku muryango" en="Community Driven" />
                  </h3>
                  <p className="text-gray-600 text-sm">
                    <T rw="Tuhugura abayobozi kandi tufasha imiryango nayo" en="We train caregivers and support families too" />
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Key Services */}
      <motion.section 
        className="px-4 py-16 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              <T rw="Icyo dutanga" en="What We Offer" />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Stethoscope className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="font-semibold text-xl mb-3">
                    <T rw="Ubuvuzi kure" en="Remote Health Consultations" />
                  </h3>
                  <p className="text-gray-600">
                    <T rw="Inama zishingiye ku muntu ku giti cye n'inzobere" en="Personalized sessions with professionals" />
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Activity className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-xl mb-3">
                    <T rw="Ubumenyi bw'ubuzima bukoresheje AI" en="AI-Powered Health Insights" />
                  </h3>
                  <p className="text-gray-600">
                    <T rw="Bongereza amakuru yihuse ashingiye ku makuru" en="Get quick, data-driven recommendations" />
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <UserCheck className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="font-semibold text-xl mb-3">
                    <T rw="Amahugurwa y'abayobozi" en="Caregiver Training" />
                  </h3>
                  <p className="text-gray-600">
                    <T rw="Wige uburyo bwo gutanga ubuvuzi bwiza mu rugo" en="Learn how to provide better care at home" />
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Calendar className="h-12 w-12 text-orange-600 mb-4" />
                  <h3 className="font-semibold text-xl mb-3">
                    <T rw="Gahunda z'ubuvuzi zishingiye ku muntu" en="Personalized Care Plans" />
                  </h3>
                  <p className="text-gray-600">
                    <T rw="Ingamba z'imirire n'ubuzima zihuye nawe" en="Tailored nutrition and wellness strategies" />
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials & Trust */}
      <motion.section 
        className="px-4 py-16 bg-green-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              <T rw="Icyo abantu bavuga" en="What People Are Saying" />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="bg-white">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    <T 
                      rw="Bicare yafashije kugenzura indyo yanjye mu buryo bwanyuma bwaguye mu mutwe."
                      en="Bicare helped me manage my diet in a way that finally made sense." 
                    />
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
                    <div>
                      <p className="font-semibold">
                        <T rw="Umukoresha wa mbere" en="Early User" />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-white">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    <T 
                      rw="Iyi platforme ishobora guhindura uburyo imitwe ibona ubuvuzi."
                      en="This platform could change how communities access healthcare." 
                    />
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
                    <div>
                      <p className="font-semibold">
                        <T rw="Umuhanga" en="Industry Expert" />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Portal Access Section */}
      <motion.section 
        className="px-4 py-16 bg-blue-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              <T rw="Injira mu binyuze mu miyoboro yacu" en="Access Our Portals" />
            </h2>
            <p className="text-lg text-gray-600">
              <T rw="Buri muntu afite uburenganzira ku bifuzo bye by'ubuzima" en="Everyone has access to their healthcare needs" />
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={itemVariants}>
              <Card 
                className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300"
                onClick={() => onNavigateToPortal('patient')}
              >
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    <T rw="Umurwayi / Umuryango" en="Patient / Family" />
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    <T rw="Genzura ubuzima bwawe n'imirimo yawe" en="Manage your health and daily tasks" />
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <T rw="Injira" en="Access Portal" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card 
                className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300"
                onClick={() => onNavigateToPortal('guide')}
              >
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    <T rw="Umufasha" en="Care Guide" />
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    <T rw="Genzura imishingire yawe n'imirimo yawe" en="Manage your shifts and patient tasks" />
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <T rw="Injira" en="Access Portal" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card 
                className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-300"
                onClick={() => onNavigateToPortal('nurse')}
              >
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    <T rw="Umuforomo" en="Nurse" />
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    <T rw="Kugenzura abafasha n'ibikorwa byabo" en="Supervise care guides and monitor operations" />
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <T rw="Injira" en="Access Portal" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card 
                className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-300"
                onClick={() => onNavigateToPortal('org')}
              >
                <CardContent className="p-6 text-center">
                  <Badge className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    <T rw="Ivuriro / Mutuelle" en="Hospital / Insurer" />
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    <T rw="Amakuru y'abarwayi n'imibare y'imikorere" en="Patient analytics and operational insights" />
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <T rw="Injira" en="Access Portal" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call-to-Action Section */}
      <motion.section 
        className="px-4 py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 className="text-3xl lg:text-4xl font-bold mb-6" variants={itemVariants}>
            <T rw="Kwitabira ejo hazaza h'ubuvuzi" en="Be Part of the Future of Healthcare" />
          </motion.h2>
          <motion.p className="text-xl mb-8 opacity-90" variants={itemVariants}>
            <T 
              rw="Injira muri Bicare uyu munsi umenye imbaraga z'ubufasha bw'ubuzima bwegereza abantu, bushingiye kuri AI"
              en="Join Bicare today and experience the power of accessible, AI-driven health support" 
            />
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
              <T rw="Injira mu rutonde rw'abahuza" en="Join the Waitlist" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
              <T rw="Korana natwe" en="Partner With Us" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">BiCare 360</h3>
              <p className="text-gray-400 mb-4">
                <T 
                  rw="Kuraguza ubuzima bwiza binyuze muri AI n'ubufasha bw'abantu"
                  en="Empowering healthier lives through AI and human-centered care" 
                />
              </p>
              <div className="flex space-x-4">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">
                <T rw="Amahuriro yihuse" en="Quick Links" />
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li><T rw="Ibyo tuvuga" en="About" /></li>
                <li><T rw="Serivisi" en="Services" /></li>
                <li><T rw="Ibibazo bikunze kubazwa" en="FAQ" /></li>
                <li><T rw="Blog" en="Blog" /></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">
                <T rw="Duhamagare" en="Contact" />
              </h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  contact@bicare.com
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Bicare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}