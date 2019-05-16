<!-- redlichKwong.php -->
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Redlich Kwong</title>
        <link rel="stylesheet" href="css/master.css">
        <link rel="stylesheet" href="css/menu.css">
        <script src="lib/jquery-3.4.0.min.js" charset="utf-8"></script>
        <script src="js/RedlichKwong/queries.js" charset="utf-8"></script>
        <script src="js/RedlichKwong/interaction.js" charset="utf-8"></script>
        <script src="js/RedlichKwong/calcs.js" charset="utf-8"></script>
    </head>
    <body>
        <?php
            include_once("menu.html");
        ?>
        <form id="entries" class="" action="" method="">
            <div class="group">
                <label for="primarySubstance">Primary substance: </label>
                <select id="primarySubstance" name="primary substance">
                    <option value="0">none</option>
                </select>
            </div>
            <div class="group">
                <label for="massPrimarySubstance">Mass primary substance (gr): </label>
                <input id="massPrimarySubstance" type="number" name="mass" step="any">
            </div>
            <div class="group">
                <label for="secondarySubstance">Secondary substance: </label>
                <select id="secondarySubstance" name="secondary substance">
                    <option value="0">none</option>
                </select>
            </div>
            <div class="group">
                <label for="massSecondarySubstance">Mass Secondary substance (gr): </label>
                <input id="massSecondarySubstance" type="number" name="mass" value="" step="any">
            </div>
            <div class="group">
                <label for="k12">Binary interaction coefficient - k_12: </label>
                <input id="k12" type="number" name="k12" step="any">
            </div>
            <div class="group">
                <p><label for=""><b>What do you want to calc?</b></label></p>
                <br>
                <input type="radio" name="variable" value="volume" onclick="displayVariable('volume');"> Volume
                <input type="radio" name="variable" value="pressure" onclick="displayVariable('pressure');"> Pressure
                <input type="radio" name="variable" value="temperature" onclick="displayVariable('temperature');"> Temperature
            </div>
            <div class="group" id="volumen-group">
                <label for="volumen">Volume (m^3): </label>
                <input id="volumen" type="number" name="volumen" step="any">
            </div>
            <div class="group" id="pressure-group">
                <label for="pressure">Pressure (bar): </label>
                <input id="pressure" type="number" name="pressure" step="any">
            </div>
            <div class="group" id="temperature-group">
                <label for="temperature">Temperature (K): </label>
                <input id="temperature" type="number" name="temperature" step="any">
            </div>
            <div class="group">
                <button id="btnSolve" class="control" type="button" name="button" onclick="solve();">
                    Calculate
                </button>
                <button id="btnClear" class="control" type="button" name="button" onclick="clear();">
                    Clear
                </button>
                <button id="btnStartAgain" class="control" type="button" name="button" onclick="startAgain();">
                    Try another
                </button>
            </div>
        </form>
        <section id="result">
            <article class="result">
                <h3>Amount of moles:</h3>
                <br>
                <div class="content-result">
                    <p id="amount-option1"></p>
                    <p id="amount-option2"></p>
                    <p id="amount-total"></p>
                </div>
            </article>
            <hr>
            <article class="result">
                <h3>Y:</h3>
                <br>
                <div class="content-result">
                    <p id="result-y1"></p>
                    <p id="result-y2"></p>
                </div>
            </article>
            <hr>
            <article class="result">
                <h3 id="result-title-sub1">Parameters of the Redlich-Kwong equation for</h3>
                <br>
                <div class="content-result">
                    <p id="result-a1"></p>
                    <p id="result-b1"></p>
                </div>
            </article>
            <hr>
            <article class="result">
                <h3 id="result-title-sub2">Parameters of the Redlich-Kwong equation for</h3>
                <br>
                <div class="content-result">
                    <p id="result-a2"></p>
                    <p id="result-b2"></p>
                </div>
            </article>
            <hr>
            <article class="result">
                <h3>A_mix:</h3>
                <br>
                <div class="content-result">
                    <p id="result-amix"></p>
                </div>
            </article>
            <hr>
            <article class="result">
                <h3>B_mix:</h3>
                <br>
                <div class="content-result">
                    <p id="result-bmix"></p>
                </div>
            </article>
            <hr>
            <article class="result">
                <h3>Molar volume:</h3>
                <br>
                <div class="content-result">
                    <p id="result-molar-volume"></p>
                </div>
            </article>
            <hr>
            <article class="result">
                <h2 id="variable-name"></h2>
                <div class="content-result">
                    <p id="result-final"></p>
                </div>
            </article>
        </section>
    </body>
</html>
