<script>
//removed the implementation of OnClickListener from the class
//and moved into an inner class
//usually, your Activity doesn't implement OnClickListener unless there's a single button
public class Practice extends Activity {

    //constants
    public static final String QUIZNUM = "QUIZNUM";
    public static final int Quiz1 = 1;
    public static final int Quiz2 = 2;
    public static final int Quiz3 = 3;
    public static final int NUMBER_OF_QUESTIONS = 10;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.practice);

        //Menu buttons
        Button quiz1 = (Button) findViewById(R.id.q1Btn);
        quiz1.setOnClickListener(new PracticeButton(Quiz1, NUMBER_OF_QUESTIONS));

        Button quiz2 = (Button) findViewById(R.id.q2Btn);
        quiz2.setOnClickListener(new PracticeButton(Quiz2, NUMBER_OF_QUESTIONS));

        Button quiz3 = (Button) findViewById(R.id.q3Btn);
        quiz3.setOnClickListener(new PracticeButton(Quiz3, NUMBER_OF_QUESTIONS));
    }

    //inner class that provides the common functionality for the buttons
    class PracticeButton implements OnClickListener {

        //declaring fields in the inner class to provide flexibility
        //think of them as the necessary external parameters
        //for the functionality of the button
        int quizNumber;
        int numQuestions;
        //stating that the consumer of this class must provide the
        //parameters for the functionality of the button
        public PracticeButton(int quizNum, int numQuestions) {
            this.quizNum = quizNum;
            this.numQuestions = numQuestions;
        }

        //here you implement the onClick
        public void onClick(View v) {
            //the switch is not necessary anymore
            Intent i;
            List<Question> questions = getQuestionSetFromDb();
            CurrentQuiz c = new CurrentQuiz();
            c.setQuestions(questions);
            c.setNumRounds(numQuestions);
            c.setQuizNum(quizNum);
            ((MLearningApp)getApplication()).setCurrentGame(c);  
            i = new Intent(QuestionActivity.this, QuestionActivity.class);
            startActivity(i);
        }

        //replaced Error by Exception
        //Error should not be used, leave it to the JVM
        private List<Question> getQuestionSetFromDb() throws Exception {
            //moved these variables as fields
            //int quizNum = this.quizNumber;
            //int numQuestions = getNumQuestions();
            DBHelper myDbHelper = new DBHelper(QuestionActivity.this);
            try {
                myDbHelper.createDataBase();
            } catch (IOException ioe) {
                throw new Exception("Unable to create database");
            }
            try {
                myDbHelper.openDataBase();
            } catch (SQLException sqle) {
                throw sqle;
            }
            List<Question> questions = myDbHelper.getQuestionSet(quizNum, numQuestions);
            myDbHelper.close();
            return questions;
        }
    }
}

</script>