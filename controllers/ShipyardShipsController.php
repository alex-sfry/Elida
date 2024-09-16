<?php

namespace app\controllers;

use Yii;
use yii\helpers\ArrayHelper;
use yii\web\Response;
use yii\web\Controller;
use app\behaviors\ShipyardShipsBehavior;
use app\models\forms\ShipyardShipsForm;
use app\services\ShipyarShipsService;
use yii\data\Pagination;
use yii\data\Sort;
use yii\web\Request;
use yii\web\Session;

use function app\helpers\d;

class ShipyardShipsController extends Controller
{
    public function actionIndex(): string
    {
        $session = Yii::$app->session;
        $request = $this->request;
        $session->open();
        // $session->destroy();
        $form = new ShipyardShipsForm();
        $params['form'] = $form;
        $service = new ShipyarShipsService();
        $params['ship_names'] = $service->ships_list;

        if (array_key_exists('formBtn', $request->get())) {
            $session->set('ship_form', $request->get());
            $form->load($session->get('ship_form'), '');

            if ($form->load($session->get('ship_form'), '') && $form->validate()) {
                $service->form = $form->attributes;
                $models = $service->findShips()->orderBy('distance')->limit(100)->asArray()->cache(600)->all();
            }
        }

        $params['form_values'] = $session->get('ship_form') ?? $form->attributes;

        if (isset($models) && !empty([$models])) {
            $params['models'] = $models;
        }

        return $this->render('index', $params);
    }
}
