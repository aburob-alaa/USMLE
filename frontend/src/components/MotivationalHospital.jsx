const HOSPITALS = [
  { name: "Massachusetts General Hospital", location: "Boston, MA", specialty: "Teaching Hospital - Harvard Medical School", note: "One of the oldest and most prestigious teaching hospitals" },
  { name: "Johns Hopkins Hospital", location: "Baltimore, MD", specialty: "Research & Teaching - Johns Hopkins University", note: "Leading medical research and patient care excellence" },
  { name: "UCSF Medical Center", location: "San Francisco, CA", specialty: "Academic Medical Center - UC San Francisco", note: "Top-ranked for research and clinical innovation" },
  { name: "Mayo Clinic", location: "Rochester, MN", specialty: "Independent Medical Practice", note: "World-renowned for comprehensive patient care" },
  { name: "Stanford Health", location: "Palo Alto, CA", specialty: "Teaching Hospital - Stanford University", note: "Excellence in medical education and research" },
  { name: "Yale New Haven Hospital", location: "New Haven, CT", specialty: "Academic Medical Center - Yale School of Medicine", note: "Comprehensive residency programs across specialties" },
  { name: "Columbia University Medical Center", location: "New York, NY", specialty: "Teaching Hospital - Columbia University", note: "Leading academic medical institution in NYC" },
  { name: "University of Pennsylvania Health System", location: "Philadelphia, PA", specialty: "Teaching Hospital - UPenn Medicine", note: "Ivy League medical excellence and innovation" },
  { name: "Duke University Hospital", location: "Durham, NC", specialty: "Teaching Hospital - Duke University School of Medicine", note: "Strong programs in medicine, surgery, and research" },
  { name: "Cleveland Clinic", location: "Cleveland, OH", specialty: "Integrated Delivery System", note: "Patient-focused care with excellent residency training" },
  { name: "University of Chicago Medicine", location: "Chicago, IL", specialty: "Academic Medical Center", note: "Top-ranked teaching hospital in the Midwest" },
  { name: "Michigan Medicine", location: "Ann Arbor, MI", specialty: "Academic Medical Center - University of Michigan", note: "Comprehensive training programs and research opportunities" },
  { name: "Washington University School of Medicine", location: "St. Louis, MO", specialty: "Academic Medical Center", note: "Excellence in clinical care and medical research" },
  { name: "Emory University School of Medicine", location: "Atlanta, GA", specialty: "Academic Medical Center", note: "Strong programs in diverse specialties" },
  { name: "UCLA Medical Center", location: "Los Angeles, CA", specialty: "Academic Medical Center - University of California", note: "Leading center for medical innovation on the West Coast" },
  { name: "Northwestern University Feinberg", location: "Chicago, IL", specialty: "Academic Medical Center", note: "Highly competitive programs and research opportunities" },
  { name: "New York-Presbyterian Hospital", location: "New York, NY", specialty: "Academic Medical Center - Columbia & Cornell", note: "Premier teaching hospital serving NYC metro area" },
  { name: "MD Anderson Cancer Center", location: "Houston, TX", specialty: "Cancer Center - UT Health", note: "World-leading cancer treatment and research" },
  { name: "Children's Hospital Boston", location: "Boston, MA", specialty: "Pediatric Teaching Hospital - Harvard", note: "Leading pediatric training and research" },
  { name: "Hospital for Special Surgery", location: "New York, NY", specialty: "Orthopedic & Rheumatologic Hospital", note: "Top-ranked for orthopedic and specialty training" },
  { name: "University of Michigan Medical School", location: "Ann Arbor, MI", specialty: "Public Medical School - Top Tier", note: "Excellence across all specialties" },
  { name: "Ohio State University Wexner Medical Center", location: "Columbus, OH", specialty: "Academic Medical Center", note: "Comprehensive training and research programs" },
  { name: "University of Wisconsin School of Medicine", location: "Madison, WI", specialty: "Public Medical School", note: "Strong primary care and specialty programs" },
  { name: "University of Minnesota Medical School", location: "Minneapolis, MN", specialty: "Public Medical School", note: "Leaders in rural medicine and community care" },
  { name: "University of Texas Southwestern", location: "Dallas, TX", specialty: "Academic Medical Center", note: "Growing powerhouse in medical education" },
  { name: "Baylor College of Medicine", location: "Houston, TX", specialty: "Private Medical School", note: "Excellent programs across all specialties" },
  { name: "University of Southern California", location: "Los Angeles, CA", specialty: "Private Medical School", note: "Strong clinical training programs" },
  { name: "University of California San Diego", location: "San Diego, CA", specialty: "Academic Medical Center", note: "Growing reputation for excellence" },
  { name: "Oregon Health & Science University", location: "Portland, OR", specialty: "Academic Medical Center", note: "Excellence in patient care and research" },
  { name: "University of Washington School of Medicine", location: "Seattle, WA", specialty: "Public Medical School", note: "Leaders in rural and underserved medicine" },
  { name: "Brigham and Women's Hospital", location: "Boston, MA", specialty: "Harvard Affiliated Teaching Hospital", note: "Top-ranked for research and clinical care" },
  { name: "Beth Israel Deaconess Medical Center", location: "Boston, MA", specialty: "Harvard Affiliated Teaching Hospital", note: "Excellence in research and clinical programs" },
  { name: "University of California Davis", location: "Sacramento, CA", specialty: "Academic Medical Center", note: "Strong rural medicine and primary care" },
  { name: "Vanderbilt University Medical Center", location: "Nashville, TN", specialty: "Academic Medical Center", note: "Growing powerhouse in the South" },
  { name: "University of Alabama at Birmingham", location: "Birmingham, AL", specialty: "Academic Medical Center", note: "Excellence in research and clinical training" },
  { name: "University of Florida College of Medicine", location: "Gainesville, FL", specialty: "Public Medical School", note: "Strong programs and growing reputation" },
  { name: "Florida State University College of Medicine", location: "Tallahassee, FL", specialty: "Public Medical School", note: "Focus on rural and underserved medicine" },
  { name: "University of Kansas School of Medicine", location: "Kansas City, KS", specialty: "Public Medical School", note: "Excellent programs across specialties" },
  { name: "University of Colorado School of Medicine", location: "Denver, CO", specialty: "Public Medical School", note: "Strong research and clinical programs" },
  { name: "University of Arizona College of Medicine", location: "Tucson, AZ", specialty: "Public Medical School", note: "Focus on rural and primary care medicine" },
  { name: "University of New Mexico School of Medicine", location: "Albuquerque, NM", specialty: "Public Medical School", note: "Excellence in rural and community medicine" },
  { name: "University of Oklahoma School of Medicine", location: "Oklahoma City, OK", specialty: "Public Medical School", note: "Strong programs across specialties" },
  { name: "University of Iowa Carver College of Medicine", location: "Iowa City, IA", specialty: "Public Medical School", note: "Excellence in research and clinical care" },
  { name: "University of Cincinnati College of Medicine", location: "Cincinnati, OH", specialty: "Public Medical School", note: "Strong clinical and research programs" },
  { name: "University of Pittsburgh School of Medicine", location: "Pittsburgh, PA", specialty: "Private Medical School", note: "Excellent research and clinical programs" },
  { name: "Virginia Commonwealth University", location: "Richmond, VA", specialty: "Public Medical School", note: "Growing reputation for excellence" },
  { name: "University of Virginia School of Medicine", location: "Charlottesville, VA", specialty: "Public Medical School", note: "Strong research and clinical programs" },
  { name: "East Carolina University School of Medicine", location: "Greenville, NC", specialty: "Public Medical School", note: "Focus on rural and underserved communities" },
  { name: "Wake Forest University School of Medicine", location: "Winston-Salem, NC", specialty: "Private Medical School", note: "Strong clinical and research programs" },
  { name: "University of South Carolina School of Medicine", location: "Columbia, SC", specialty: "Public Medical School", note: "Growing programs and research opportunities" },
  { name: "Mercer University School of Medicine", location: "Macon, GA", specialty: "Private Medical School", note: "Excellent programs and mentorship" },
  { name: "Morehouse School of Medicine", location: "Atlanta, GA", specialty: "Historically Black Medical School", note: "Excellence and diversity in medicine" },
  { name: "Howard University College of Medicine", location: "Washington, D.C.", specialty: "Historically Black Medical School", note: "Strong clinical and research programs" },
  { name: "University of Maryland School of Medicine", location: "Baltimore, MD", specialty: "Public Medical School", note: "Strong programs in urban medicine" },
  { name: "Temple University School of Medicine", location: "Philadelphia, PA", specialty: "Private Medical School", note: "Excellent urban medicine training" },
  { name: "Drexel University College of Medicine", location: "Philadelphia, PA", specialty: "Private Medical School", note: "Strong clinical and research programs" },
  { name: "Cornell University Weill Medical College", location: "New York, NY", specialty: "Ivy League Medical School", note: "Excellence and prestige in medical training" },
  { name: "Brown University Warren Alpert Medical School", location: "Providence, RI", specialty: "Ivy League Medical School", note: "Excellent research and clinical programs" },
  { name: "Dartmouth Geisel School of Medicine", location: "Hanover, NH", specialty: "Ivy League Medical School", note: "Primary care and rural medicine focus" },
  { name: "Tufts University School of Medicine", location: "Boston, MA", specialty: "Private Medical School", note: "Strong research and clinical programs" },
  { name: "Boston University School of Medicine", location: "Boston, MA", specialty: "Private Medical School", note: "Excellent clinical and research programs" },
  { name: "University of Massachusetts Medical School", location: "Worcester, MA", specialty: "Public Medical School", note: "Strong programs and community focus" },
  { name: "Harvard Medical School", location: "Boston, MA", specialty: "Ivy League Medical School", note: "Highest prestige and excellence in medical education" },
  { name: "Yale School of Medicine", location: "New Haven, CT", specialty: "Ivy League Medical School", note: "Excellence in research and clinical training" },
  { name: "University of Connecticut School of Medicine", location: "Farmington, CT", specialty: "Public Medical School", note: "Strong clinical and research programs" },
  { name: "University of Vermont Larner Medical School", location: "Burlington, VT", specialty: "Public Medical School", note: "Rural medicine and community health focus" },
  { name: "University of Rochester School of Medicine", location: "Rochester, NY", specialty: "Private Medical School", note: "Excellence in research and clinical care" },
  { name: "Albany Medical College", location: "Albany, NY", specialty: "Private Medical School", note: "Strong regional programs and research" },
  { name: "SUNY Upstate Medical University", location: "Syracuse, NY", specialty: "Public Medical School", note: "Excellent clinical and research programs" },
  { name: "SUNY Stony Brook School of Medicine", location: "Stony Brook, NY", specialty: "Public Medical School", note: "Strong research and clinical programs" },
  { name: "Mount Sinai School of Medicine", location: "New York, NY", specialty: "Private Medical School", note: "Excellence in research and urban medicine" },
  { name: "New York University School of Medicine", location: "New York, NY", specialty: "Private Medical School", note: "Prestigious institution with strong programs" },
  { name: "Albert Einstein College of Medicine", location: "Bronx, NY", specialty: "Private Medical School", note: "Excellence in research and clinical training" },
  { name: "Case Western Reserve School of Medicine", location: "Cleveland, OH", specialty: "Private Medical School", note: "Strong research and clinical programs" },
  { name: "University of Pittsburgh Medical Center", location: "Pittsburgh, PA", specialty: "Academic Medical Center", note: "Excellence across all specialties" },
  { name: "Penn State University College of Medicine", location: "Hershey, PA", specialty: "Public Medical School", note: "Growing reputation and strong programs" },
  { name: "Jefferson University", location: "Philadelphia, PA", specialty: "Private Medical School", note: "Excellent clinical and research programs" },
  { name: "University of Tennessee College of Medicine", location: "Memphis, TN", specialty: "Public Medical School", note: "Strong programs and regional reputation" },
  { name: "University of Kentucky College of Medicine", location: "Lexington, KY", specialty: "Public Medical School", note: "Growing reputation and strong programs" },
  { name: "University of Louisville School of Medicine", location: "Louisville, KY", specialty: "Public Medical School", note: "Strong clinical and research programs" },
  { name: "University of Arkansas for Medical Sciences", location: "Little Rock, AR", specialty: "Public Medical School", note: "Excellent regional programs" },
  { name: "University of Mississippi School of Medicine", location: "Jackson, MS", specialty: "Public Medical School", note: "Strong community focus and programs" },
  { name: "Louisiana State University School of Medicine", location: "New Orleans, LA", specialty: "Public Medical School", note: "Excellence in urban medicine training" },
  { name: "Tulane University School of Medicine", location: "New Orleans, LA", specialty: "Private Medical School", note: "Strong research and clinical programs" },
  { name: "Texas Tech University School of Medicine", location: "Lubbock, TX", specialty: "Public Medical School", note: "Rural medicine and underserved focus" },
  { name: "University of Texas Medical Branch", location: "Galveston, TX", specialty: "Public Medical School", note: "Strong research and clinical programs" },
  { name: "University of Texas Health Science Center San Antonio", location: "San Antonio, TX", specialty: "Public Medical School", note: "Excellent programs and growing reputation" },
  { name: "University of Texas Health Science Center Houston", location: "Houston, TX", specialty: "Public Medical School", note: "Strong research and clinical programs" },
  { name: "Medical University of South Carolina", location: "Charleston, SC", specialty: "Public Medical School", note: "Excellence in clinical and research programs" },
  { name: "University of Hawaii John A. Burns School of Medicine", location: "Honolulu, HI", specialty: "Public Medical School", note: "Unique island medicine training opportunities" },
  { name: "University of Nevada School of Medicine", location: "Reno, NV", specialty: "Public Medical School", note: "Growing reputation and strong programs" },
  { name: "University of Montana School of Medicine", location: "Missoula, MT", specialty: "Public Medical School", note: "Rural medicine focus and community health" },
  { name: "University of North Dakota School of Medicine", location: "Grand Forks, ND", specialty: "Public Medical School", note: "Rural medicine and primary care focus" },
  { name: "University of South Dakota School of Medicine", location: "Sioux Falls, SD", specialty: "Public Medical School", note: "Strong rural and primary care programs" },
  { name: "Creighton University School of Medicine", location: "Omaha, NE", specialty: "Private Medical School", note: "Excellent clinical and research programs" },
  { name: "University of Nebraska College of Medicine", location: "Omaha, NE", specialty: "Public Medical School", note: "Strong clinical and research programs" },
];

export default function MotivationalHospital() {
  // Show a random hospital on each render (changes with every log/update)
  const hospitalIndex = Math.floor(Math.random() * HOSPITALS.length);
  const hospital = HOSPITALS[hospitalIndex];

  return (
    <div className="motivational-card">
      <div className="motivational-header">
        🏥 Your Future Training Home
      </div>
      <div className="hospital-name">{hospital.name}</div>
      <div className="hospital-location">{hospital.location}</div>
      <div className="hospital-specialty">{hospital.specialty}</div>
      <div className="hospital-note">"{hospital.note}"</div>
      <div className="motivational-footer">
        Every question brings you closer to this opportunity.
      </div>
    </div>
  );
}
